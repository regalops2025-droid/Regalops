import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });


const app = express();
const PORT = process.env.PORT || 5001;

// Set up secure CORS configuration
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config for CV/Resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed."));
    }
  }
});

const JWT_SECRET = process.env.JWT_SECRET || "regalops-secret-jwt-token-98317";

// Middleware to verify session cookies
function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Access denied. No session token provided." });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid session token." });
  }
}

// MySQL connection pool settings
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "regalops_db",
  port: parseInt(process.env.DB_PORT || "3306"),
};

// Mock database pool that acts as an in-memory/file-based fallback when MySQL is not running
class MockPool {
  constructor() {
    this.dbPath = path.join(__dirname, "mock_db.json");
    this.data = {
      contact_enquiries: [],
      users: [],
      solutions: [],
      technologies: [],
      clients: [],
      jobs: [],
      blogs: [],
      job_applications: [],
      industries: []
    };
    this.autoIncrement = {};
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(this.dbPath)) {
        const fileContent = fs.readFileSync(this.dbPath, "utf8");
        this.data = JSON.parse(fileContent);
        if (!this.data.industries) {
          this.data.industries = [];
        }
      }
    } catch (err) {
      console.error("Failed to load mock database file:", err.message);
    }
    // Initialize autoIncrement counters
    Object.keys(this.data).forEach(table => {
      const rows = this.data[table] || [];
      const maxId = rows.reduce((max, row) => Math.max(max, row.id || 0), 0);
      this.autoIncrement[table] = maxId + 1;
    });
  }

  save() {
    try {
      fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2), "utf8");
    } catch (err) {
      console.error("Failed to save mock database file:", err.message);
    }
  }

  async getConnection() {
    return {
      release: () => {}
    };
  }

  async query(sql, params = []) {
    const queryStr = sql.trim().replace(/\s+/g, ' ');
    const upperSQL = queryStr.toUpperCase();

    // 1. DROP TABLE / CREATE TABLE / ALTER TABLE / SHOW TABLES
    if (upperSQL.startsWith("DROP TABLE") || upperSQL.startsWith("CREATE TABLE") || upperSQL.startsWith("ALTER TABLE")) {
      if (upperSQL.startsWith("DROP TABLE")) {
        const match = queryStr.match(/DROP TABLE\s+(?:IF EXISTS\s+)?(\w+)/i);
        if (match) {
          const table = match[1].toLowerCase();
          this.data[table] = [];
          this.autoIncrement[table] = 1;
          this.save();
        }
      }
      return [[]];
    }

    // 2. SHOW COLUMNS FROM
    if (upperSQL.startsWith("SHOW COLUMNS")) {
      const match = queryStr.match(/SHOW COLUMNS\s+FROM\s+(\w+)/i);
      if (match) {
        const table = match[1].toLowerCase();
        if (table === "solutions") {
          return [[
            { Field: "id" },
            { Field: "name" },
            { Field: "image" },
            { Field: "description" },
            { Field: "capabilities" },
            { Field: "methodology" },
            { Field: "deliverables" },
            { Field: "technologies" },
            { Field: "created_at" }
          ]];
        }
      }
      return [[]];
    }

    // 3. DELETE FROM
    if (upperSQL.startsWith("DELETE FROM")) {
      const match = queryStr.match(/DELETE FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?$/i);
      if (match) {
        const table = match[1].toLowerCase();
        const whereClause = match[2];
        if (!whereClause) {
          this.data[table] = [];
        } else {
          const whereParts = whereClause.split("=");
          if (whereParts.length === 2) {
            const field = whereParts[0].trim().toLowerCase();
            const val = params[0];
            this.data[table] = (this.data[table] || []).filter(row => row[field] != val);
          }
        }
        this.save();
        return [{ affectedRows: 1 }];
      }
    }

    // 4. INSERT INTO
    if (upperSQL.startsWith("INSERT INTO")) {
      const match = queryStr.match(/INSERT INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i);
      if (match) {
        const table = match[1].toLowerCase();
        const fields = match[2].split(",").map(f => f.trim().toLowerCase());
        const row = { id: this.autoIncrement[table]++, created_at: new Date().toISOString() };
        fields.forEach((field, index) => {
          row[field] = params[index] !== undefined ? params[index] : null;
        });
        if (!this.data[table]) {
          this.data[table] = [];
        }
        this.data[table].push(row);
        this.save();
        return [{ insertId: row.id, affectedRows: 1 }];
      }
    }

    // 5. UPDATE
    if (upperSQL.startsWith("UPDATE")) {
      const match = queryStr.match(/UPDATE\s+(\w+)\s+SET\s+(.+?)(?:\s+WHERE\s+(.+?))?$/i);
      if (match) {
        const table = match[1].toLowerCase();
        const setClause = match[2];
        const whereClause = match[3];

        const setFields = setClause.split(",").map(s => s.split("=")[0].trim().toLowerCase());
        const updateParams = params.slice(0, setFields.length);

        let whereField = null;
        let whereVal = null;
        if (whereClause) {
          if (whereClause.includes("name = ?")) {
            whereField = "name";
            whereVal = params[setFields.length];
          } else {
            whereField = whereClause.split("=")[0].trim().toLowerCase();
            whereVal = params[setFields.length];
          }
        }

        this.data[table] = (this.data[table] || []).map(row => {
          let matches = true;
          if (whereField) {
            matches = row[whereField] == whereVal;
            if (matches && whereClause.includes("capabilities IS NULL")) {
              matches = !row.capabilities || row.capabilities === '';
            }
          }
          if (matches) {
            setFields.forEach((field, index) => {
              row[field] = updateParams[index] !== undefined ? updateParams[index] : null;
            });
          }
          return row;
        });
        this.save();
        return [{ affectedRows: 1 }];
      }
    }

    // 6. SELECT
    if (upperSQL.startsWith("SELECT")) {
      const match = queryStr.match(/SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER BY\s+(.+?))?$/i);
      if (match) {
        const table = match[2].toLowerCase();
        const whereClause = match[3];
        let rows = this.data[table] || [];

        if (whereClause) {
          const cleanWhere = whereClause.trim().replace(/\s+/g, ' ');
          if (cleanWhere.includes("email = ?")) {
            const val = params[0];
            rows = rows.filter(row => row.email === val);
          } else if (cleanWhere.includes("id = ?")) {
            const val = params[0];
            rows = rows.filter(row => row.id == val);
          } else if (cleanWhere.includes("cv_path")) {
            const val = params[0];
            rows = rows.filter(row => row.id == val);
          } else if (cleanWhere.includes("capabilities IS NULL")) {
            rows = rows.filter(row => !row.capabilities);
          } else if (cleanWhere.includes("name = ?")) {
            const val = params[0];
            rows = rows.filter(row => row.name === val);
          }
        }

        if (upperSQL.includes("ORDER BY ID ASC")) {
          rows.sort((a, b) => a.id - b.id);
        } else if (upperSQL.includes("ORDER BY CREATED_AT DESC")) {
          rows.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        return [JSON.parse(JSON.stringify(rows))];
      }
    }

    return [[]];
  }
}

let pool;

async function initDB() {
  try {
    try {
      pool = mysql.createPool(dbConfig);
      // Test connection
      const conn = await pool.getConnection();
      console.log("Successfully connected to MySQL database.");
      conn.release();
    } catch (dbErr) {
      console.warn("Could not connect to MySQL database. Falling back to local JSON database simulation.", dbErr.message);
      pool = new MockPool();
    }

    // Create contact_enquiries table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        mobile VARCHAR(255) NOT NULL,
        city VARCHAR(255),
        state VARCHAR(255),
        country VARCHAR(255),
        zip_code VARCHAR(255),
        service VARCHAR(255) NOT NULL,
        comments TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table "contact_enquiries" verified.');

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table "users" verified.');

    // Seed default admin users if they do not exist
    const [existingUsers] = await pool.query("SELECT * FROM users");
    const existingEmails = existingUsers.map(u => u.email);

    if (!existingEmails.includes("admin@regalops.com")) {
      const hashedPass1 = await bcrypt.hash("admin123", 10);
      await pool.query(
        "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
        ["admin@regalops.com", hashedPass1, "Regal Admin"]
      );
      console.log("Seeded default admin user with bcrypt.");
    }

    const hashedPass2 = await bcrypt.hash("Regalops@123", 10);
    if (!existingEmails.includes("regalops2025@gmail.com")) {
      await pool.query(
        "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
        ["regalops2025@gmail.com", hashedPass2, "Shivakumar"]
      );
      console.log("Seeded requested admin user with bcrypt.");
    } else {
      await pool.query(
        "UPDATE users SET password = ? WHERE email = ?",
        [hashedPass2, "regalops2025@gmail.com"]
      );
      console.log("Forced admin user password update to match current credentials.");
    }

    // Create solutions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS solutions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500),
        description TEXT NOT NULL,
        capabilities TEXT,
        methodology TEXT,
        deliverables TEXT,
        technologies TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table "solutions" verified.');

    // Add columns dynamically if table already existed without them, and perform necessary migrations
    try {
      const [columns] = await pool.query("SHOW COLUMNS FROM solutions");
      const columnNames = columns.map(c => c.Field);

      // Rename title -> name if name is missing but title exists
      if (columnNames.includes("title") && !columnNames.includes("name")) {
        await pool.query("ALTER TABLE solutions CHANGE COLUMN title name VARCHAR(255) NOT NULL");
        console.log("Database Migration: Renamed 'title' to 'name' in solutions table.");
      }

      // Rename icon -> image if image is missing but icon exists
      if (columnNames.includes("icon") && !columnNames.includes("image")) {
        await pool.query("ALTER TABLE solutions CHANGE COLUMN icon image VARCHAR(500)");
        console.log("Database Migration: Renamed 'icon' to 'image' in solutions table.");
      }

      // Rename features -> capabilities if capabilities is missing but features exists
      if (columnNames.includes("features") && !columnNames.includes("capabilities")) {
        await pool.query("ALTER TABLE solutions CHANGE COLUMN features capabilities TEXT");
        console.log("Database Migration: Renamed 'features' to 'capabilities' in solutions table.");
      }

      // Add missing columns
      if (!columnNames.includes("capabilities") && !columnNames.includes("features")) {
        await pool.query("ALTER TABLE solutions ADD COLUMN capabilities TEXT");
      }
      if (!columnNames.includes("methodology")) {
        await pool.query("ALTER TABLE solutions ADD COLUMN methodology TEXT");
      }
      if (!columnNames.includes("deliverables")) {
        await pool.query("ALTER TABLE solutions ADD COLUMN deliverables TEXT");
      }
      if (!columnNames.includes("technologies")) {
        await pool.query("ALTER TABLE solutions ADD COLUMN technologies TEXT");
      }
    } catch (err) {
      console.error("Error migrating solutions table:", err.message);
    }

    // Create technologies table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS technologies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        keywords VARCHAR(500),
        how_to_work TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table "technologies" verified.');

    // Add columns dynamically if table already existed without them
    try {
      const [columns] = await pool.query("SHOW COLUMNS FROM technologies");
      const columnNames = columns.map(c => c.Field);
      if (columnNames.length > 0 && !columnNames.includes("description")) {
        await pool.query("ALTER TABLE technologies ADD COLUMN description TEXT NOT NULL");
        console.log("Database Migration: Added missing 'description' column to 'technologies' table.");
      }
      if (columnNames.length > 0 && !columnNames.includes("keywords")) {
        await pool.query("ALTER TABLE technologies ADD COLUMN keywords VARCHAR(500)");
        console.log("Database Migration: Added missing 'keywords' column to 'technologies' table.");
      }
      if (columnNames.length > 0 && !columnNames.includes("how_to_work")) {
        await pool.query("ALTER TABLE technologies ADD COLUMN how_to_work TEXT");
        console.log("Database Migration: Added missing 'how_to_work' column to 'technologies' table.");
      }

      // Seed default technologies if they don't exist
      const defaultTechs = [
        { name: "React", description: "Fast, component-based frontend user interfaces.", keywords: "Frontend, SPA, UI", how_to_work: "We build reactive client-side interfaces and complex portals." },
        { name: "Next.js", description: "Server-side rendering and static React framework.", keywords: "SSR, SSG, React", how_to_work: "Used for SEO-optimized landing pages and public-facing routes." },
        { name: "TypeScript", description: "Strict syntactical superset of JavaScript adding static typing.", keywords: "Type-Safe, JS, Compile", how_to_work: "Adopted across all codebases to reduce runtime errors and bugs." },
        { name: "Node.js", description: "Scalable event-driven asynchronous JavaScript runtime.", keywords: "Backend, Runtime, Express", how_to_work: "Powers our microservices, APIs, and real-time backend integrations." },
        { name: "Python", description: "Versatile language for backend services, scripting and ML.", keywords: "ML, Data, Backend", how_to_work: "Used for data pipelines, scripting, and training machine learning models." },
        { name: "Go", description: "High-performance compiled language for concurrent microservices.", keywords: "Microservices, Concurrency, Fast", how_to_work: "Powers performance-critical API routes and background worker services." },
        { name: "Rust", description: "Memory-safe systems language for CPU-intensive modules.", keywords: "Systems, Memory-Safe, CPU", how_to_work: "Used for computational tasks and low-latency systems integration." },
        { name: "PostgreSQL", description: "Powerful object-relational open-source database system.", keywords: "SQL, Relational, ACID", how_to_work: "Primary database engine for transactional and structured storage." },
        { name: "MongoDB", description: "Flexible document-based NoSQL database for unstructured data.", keywords: "NoSQL, Document, JSON", how_to_work: "Stores log streams, audits, and unstructured document schemas." },
        { name: "Kafka", description: "Distributed event streaming platform for high-throughput pipelines.", keywords: "Streaming, Events, Messaging", how_to_work: "Orchestrates asynchronous event pipelines between our backend jobs." },
        { name: "Redis", description: "In-memory data structure store used as database, cache and broker.", keywords: "Cache, Key-Value, Session", how_to_work: "Utilized for session state storage and high-speed caching layers." },
        { name: "Kubernetes", description: "Container orchestration platform for scaling applications.", keywords: "Containers, Cloud-Native, Devops", how_to_work: "Orchestrates container scaling and load balancing in our server clusters." },
        { name: "Docker", description: "Containerization platform to package and deploy software.", keywords: "Containers, Packaging, Deploy", how_to_work: "Packages all environments to guarantee local-to-production parity." },
        { name: "Terraform", description: "Infrastructure as Code to provision cloud resources.", keywords: "IaC, Terraform, Infra", how_to_work: "Provisions all server groups, databases, and networks via code declarations." },
        { name: "AWS", description: "Amazon Web Services cloud platform and serverless resources.", keywords: "Cloud, Serverless, IAM", how_to_work: "Hosts our cloud resources, serverless operations, and file storage." },
        { name: "Azure", description: "Microsoft cloud solutions for enterprise hosting and AD integration.", keywords: "Cloud, Enterprise, AD", how_to_work: "Primary hosting platform for clients with strict Active Directory needs." },
        { name: "GCP", description: "Google Cloud Platform tailored for Kubernetes, big data and AI.", keywords: "Cloud, Kubernetes, AI", how_to_work: "Powers our container workloads, big data analytics, and AI models." },
        { name: "Snowflake", description: "Cloud data warehousing platform for analytics at scale.", keywords: "Warehouse, Data, SQL", how_to_work: "Consolidates multi-platform records for big data reporting and BI." },
        { name: "dbt", description: "Data build tool to transform data in warehouses using SQL.", keywords: "Data, SQL, ETL", how_to_work: "Transforms raw warehouse datasets into business-ready clean tables." },
        { name: "PyTorch", description: "Deep learning framework for training neural networks.", keywords: "AI, Deep Learning, Tensor", how_to_work: "Engineers use it to train and test advanced custom AI architectures." },
        { name: "TensorFlow", description: "Open-source machine learning platform for AI models.", keywords: "AI, Machine Learning, Models", how_to_work: "Runs and serves production computer vision and translation models." },
        { name: "Swift", description: "Native iOS app development with compiled performance.", keywords: "iOS, Mobile, Native", how_to_work: "Powers high-performance native iOS clients for our business portals." },
        { name: "Kotlin", description: "Modern Android app development with type-safe syntax.", keywords: "Android, Mobile, Native", how_to_work: "Used to write modern native Android clients with optimal performance." },
        { name: "GraphQL", description: "Query language for APIs to fetch exactly the data needed.", keywords: "API, Query, Client", how_to_work: "Lets client portals query precise fields, minimizing network overhead." }
      ];

      let seededCount = 0;
      for (const t of defaultTechs) {
        const [rows] = await pool.query("SELECT * FROM technologies WHERE name = ?", [t.name]);
        if (rows.length === 0) {
          await pool.query(
            "INSERT INTO technologies (name, description, keywords, how_to_work) VALUES (?, ?, ?, ?)",
            [t.name, t.description, t.keywords, t.how_to_work]
          );
          seededCount++;
        }
      }
      if (seededCount > 0) {
        console.log(`Database Seed: Seeded ${seededCount} new default technologies into database.`);
      }
    } catch (err) {
      console.error("Error migrating or seeding technologies table:", err.message);
    }

    // Create clients table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        sector VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table "clients" verified.');

    // Create industries table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS industries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table "industries" verified.');

    // Create jobs table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table "jobs" verified.');

    // Create blogs table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        tag VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        description TEXT NOT NULL,
        content LONGTEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table "blogs" verified.');

    // Add columns dynamically if table already existed without them
    try {
      const [columns] = await pool.query("SHOW COLUMNS FROM blogs");
      const columnNames = columns.map(c => c.Field);
      if (columnNames.length > 0) {
        if (columnNames.includes("image_path") && !columnNames.includes("image")) {
          await pool.query("ALTER TABLE blogs CHANGE COLUMN image_path image VARCHAR(255)");
          console.log("Database Migration: Renamed 'image_path' to 'image' in 'blogs' table.");
        }
        if (!columnNames.includes("tag")) {
          await pool.query("ALTER TABLE blogs ADD COLUMN tag VARCHAR(255) NOT NULL DEFAULT 'Engineering'");
          console.log("Database Migration: Added missing 'tag' column to 'blogs' table.");
        }
        if (!columnNames.includes("description")) {
          await pool.query("ALTER TABLE blogs ADD COLUMN description TEXT NOT NULL DEFAULT ''");
          console.log("Database Migration: Added missing 'description' column to 'blogs' table.");
        }
      }
    } catch (err) {
      console.error("Error migrating blogs table:", err.message);
    }

    // Create job applications table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS job_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        job_id INT NOT NULL,
        job_title VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        mobile VARCHAR(255) NOT NULL,
        cv_path VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table "job_applications" verified.');
  } catch (error) {
    console.error("Database initialization failed:", error.message);
  }
}

// Routes
app.post("/api/contact", async (req, res) => {
  const { first_name, last_name, email, mobile, city, state, country, zip_code, service, comments } = req.body;

  if (!first_name || !last_name || !email || !mobile || !service || !comments) {
    return res.status(400).json({ error: "First name, last name, email, mobile, service, and comments are required." });
  }

  try {
    await pool.query(
      "INSERT INTO contact_enquiries (first_name, last_name, email, mobile, city, state, country, zip_code, service, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [first_name, last_name, email, mobile, city || null, state || null, country || null, zip_code || null, service, comments]
    );
    res.status(201).json({ message: "Enquiry received successfully." });
  } catch (error) {
    console.error("Error inserting enquiry:", error);
    res.status(500).json({ error: "Failed to save enquiry." });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = rows[0];
    // Normalize PHP $2y$ BCRYPT hash prefix to $2a$ for bcryptjs compatibility
    const normalizedHash = user.password.startsWith("$2y$") 
      ? user.password.replace(/^\$2y\$/, "$2a$") 
      : user.password;
    const isMatch = await bcrypt.compare(password, normalizedHash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Sign JWT token
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
      expiresIn: "24h"
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // In production, use true (HTTPS)
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({
      message: "Login successful.",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login." });
  }
});

// POST logout admin
app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully." });
});

// GET currently logged-in user profile
app.get("/api/auth/me", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

// GET all enquiries sorted by date (secured)
app.get("/api/enquiries", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM contact_enquiries ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ error: "Failed to fetch enquiries." });
  }
});

// DELETE an enquiry by ID (secured)
app.delete("/api/enquiries/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM contact_enquiries WHERE id = ?", [id]);
    res.json({ message: "Enquiry deleted successfully." });
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    res.status(500).json({ error: "Failed to delete enquiry." });
  }
});

// POST apply for a job with resume upload (PDF)
app.post("/api/jobs/:id/apply", upload.single("cv"), async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, mobile, job_title } = req.body;

  if (!first_name || !last_name || !email || !mobile || !job_title) {
    // Clean up uploaded file if fields validation fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ error: "First name, last name, email, mobile, and job title are required." });
  }

  if (!req.file) {
    return res.status(400).json({ error: "PDF Resume/CV is required." });
  }

  const cv_path = `/uploads/${req.file.filename}`;

  try {
    await pool.query(
      "INSERT INTO job_applications (job_id, job_title, first_name, last_name, email, mobile, cv_path) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [parseInt(id), job_title, first_name, last_name, email, mobile, cv_path]
    );
    res.status(201).json({ message: "Job application submitted successfully!" });
  } catch (error) {
    console.error("Error saving job application:", error);
    // Cleanup CV file
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: "Failed to submit job application. Please try again." });
  }
});

// GET all job applications (secured)
app.get("/api/applications", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM job_applications ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Failed to fetch job applications." });
  }
});

// DELETE a job application by ID (secured)
app.delete("/api/applications/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    // Delete file if possible
    const [rows] = await pool.query("SELECT cv_path FROM job_applications WHERE id = ?", [id]);
    if (rows.length > 0) {
      const relativePath = rows[0].cv_path;
      const fullPath = path.join(__dirname, relativePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
    await pool.query("DELETE FROM job_applications WHERE id = ?", [id]);
    res.json({ message: "Job application deleted successfully." });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ error: "Failed to delete job application." });
  }
});

// GET all solutions
app.get("/api/solutions", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM solutions ORDER BY id ASC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching solutions:", error);
    res.status(500).json({ error: "Failed to fetch solutions." });
  }
});

// POST a new solution
app.post("/api/solutions", verifyToken, async (req, res) => {
  const { name, image, description, capabilities, methodology, deliverables, technologies } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required." });
  }

  try {
    const capabilitiesStr = capabilities ? (typeof capabilities === "string" ? capabilities : JSON.stringify(capabilities)) : null;
    const methodologyStr = methodology ? (typeof methodology === "string" ? methodology : JSON.stringify(methodology)) : null;
    const deliverablesStr = deliverables ? (typeof deliverables === "string" ? deliverables : JSON.stringify(deliverables)) : null;
    const technologiesStr = technologies ? (typeof technologies === "string" ? technologies : JSON.stringify(technologies)) : null;

    const [result] = await pool.query(
      "INSERT INTO solutions (name, image, description, capabilities, methodology, deliverables, technologies) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, image || null, description, capabilitiesStr, methodologyStr, deliverablesStr, technologiesStr]
    );
    res.status(201).json({ 
      id: result.insertId, 
      name, 
      image, 
      description, 
      capabilities: capabilities || null, 
      methodology: methodology || null, 
      deliverables: deliverables || null, 
      technologies: technologies || null 
    });
  } catch (error) {
    console.error("Error creating solution:", error);
    res.status(500).json({ error: "Failed to create solution." });
  }
});

// DELETE a solution by ID
app.delete("/api/solutions/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM solutions WHERE id = ?", [id]);
    res.json({ message: "Solution deleted successfully." });
  } catch (error) {
    console.error("Error deleting solution:", error);
    res.status(500).json({ error: "Failed to delete solution." });
  }
});

// PUT (update) a solution by ID
app.put("/api/solutions/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, image, description, capabilities, methodology, deliverables, technologies } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required." });
  }

  try {
    const capabilitiesStr = capabilities ? (typeof capabilities === "string" ? capabilities : JSON.stringify(capabilities)) : null;
    const methodologyStr = methodology ? (typeof methodology === "string" ? methodology : JSON.stringify(methodology)) : null;
    const deliverablesStr = deliverables ? (typeof deliverables === "string" ? deliverables : JSON.stringify(deliverables)) : null;
    const technologiesStr = technologies ? (typeof technologies === "string" ? technologies : JSON.stringify(technologies)) : null;

    await pool.query(
      "UPDATE solutions SET name = ?, image = ?, description = ?, capabilities = ?, methodology = ?, deliverables = ?, technologies = ? WHERE id = ?",
      [name, image || null, description, capabilitiesStr, methodologyStr, deliverablesStr, technologiesStr, id]
    );
    res.json({ 
      id: parseInt(id), 
      name, 
      image, 
      description, 
      capabilities: capabilities || null, 
      methodology: methodology || null, 
      deliverables: deliverables || null, 
      technologies: technologies || null 
    });
  } catch (error) {
    console.error("Error updating solution:", error);
    res.status(500).json({ error: "Failed to update solution." });
  }
});

// GET all technologies
app.get("/api/technologies", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM technologies ORDER BY id ASC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching technologies:", error);
    res.status(500).json({ error: "Failed to fetch technologies." });
  }
});

// POST a new technology
app.post("/api/technologies", verifyToken, async (req, res) => {
  const { name, description, keywords, how_to_work } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required." });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO technologies (name, description, keywords, how_to_work) VALUES (?, ?, ?, ?)",
      [name, description, keywords || null, how_to_work || null]
    );
    res.status(201).json({ id: result.insertId, name, description, keywords: keywords || null, how_to_work: how_to_work || null });
  } catch (error) {
    console.error("Error creating technology:", error);
    res.status(500).json({ error: "Failed to create technology." });
  }
});

// PUT (update) a technology by ID
app.put("/api/technologies/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, keywords, how_to_work } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required." });
  }

  try {
    await pool.query(
      "UPDATE technologies SET name = ?, description = ?, keywords = ?, how_to_work = ? WHERE id = ?",
      [name, description, keywords || null, how_to_work || null, id]
    );
    res.json({ id: parseInt(id), name, description, keywords: keywords || null, how_to_work: how_to_work || null });
  } catch (error) {
    console.error("Error updating technology:", error);
    res.status(500).json({ error: "Failed to update technology." });
  }
});

// DELETE a technology by ID
app.delete("/api/technologies/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM technologies WHERE id = ?", [id]);
    res.json({ message: "Technology deleted successfully." });
  } catch (error) {
    console.error("Error deleting technology:", error);
    res.status(500).json({ error: "Failed to delete technology." });
  }
});

// GET all clients
app.get("/api/clients", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clients ORDER BY id ASC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Failed to fetch clients." });
  }
});

// POST a new client case study
app.post("/api/clients", verifyToken, async (req, res) => {
  const { name, sector, image, description } = req.body;

  if (!name || !sector || !description) {
    return res.status(400).json({ error: "Name, sector, and description are required." });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO clients (name, sector, image, description) VALUES (?, ?, ?, ?)",
      [name, sector, image || null, description]
    );
    res.status(201).json({ id: result.insertId, name, sector, image, description });
  } catch (error) {
    console.error("Error creating client record:", error);
    res.status(500).json({ error: "Failed to create client record." });
  }
});

// PUT (update) a client by ID
app.put("/api/clients/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, sector, image, description } = req.body;

  if (!name || !sector || !description) {
    return res.status(400).json({ error: "Name, sector, and description are required." });
  }

  try {
    await pool.query(
      "UPDATE clients SET name = ?, sector = ?, image = ?, description = ? WHERE id = ?",
      [name, sector, image || null, description, id]
    );
    res.json({ id: parseInt(id), name, sector, image, description });
  } catch (error) {
    console.error("Error updating client record:", error);
    res.status(500).json({ error: "Failed to update client record." });
  }
});

// DELETE a client by ID
app.delete("/api/clients/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM clients WHERE id = ?", [id]);
    res.json({ message: "Client record deleted successfully." });
  } catch (error) {
    console.error("Error deleting client record:", error);
    res.status(500).json({ error: "Failed to delete client record." });
  }
});

// GET all jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM jobs ORDER BY id ASC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs." });
  }
});

// POST a new job opening
app.post("/api/jobs", verifyToken, async (req, res) => {
  const { title, location, type } = req.body;

  if (!title || !location || !type) {
    return res.status(400).json({ error: "Title, location, and type are required." });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO jobs (title, location, type) VALUES (?, ?, ?)",
      [title, location, type]
    );
    res.status(201).json({ id: result.insertId, title, location, type });
  } catch (error) {
    console.error("Error creating job record:", error);
    res.status(500).json({ error: "Failed to create job record." });
  }
});

// PUT (update) a job by ID
app.put("/api/jobs/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, location, type } = req.body;

  if (!title || !location || !type) {
    return res.status(400).json({ error: "Title, location, and type are required." });
  }

  try {
    await pool.query(
      "UPDATE jobs SET title = ?, location = ?, type = ? WHERE id = ?",
      [title, location, type, id]
    );
    res.json({ id: parseInt(id), title, location, type });
  } catch (error) {
    console.error("Error updating job record:", error);
    res.status(500).json({ error: "Failed to update job record." });
  }
});

// DELETE a job by ID
app.delete("/api/jobs/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM jobs WHERE id = ?", [id]);
    res.json({ message: "Job record deleted successfully." });
  } catch (error) {
    console.error("Error deleting job record:", error);
    res.status(500).json({ error: "Failed to delete job record." });
  }
});

// GET all blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM blogs ORDER BY id ASC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs." });
  }
});

// GET a single blog by ID
app.get("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM blogs WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Blog not found." });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Failed to fetch blog." });
  }
});

// POST a new blog
app.post("/api/blogs", verifyToken, async (req, res) => {
  const { title, tag, image, description, content } = req.body;

  if (!title || !tag || !description || !content) {
    return res.status(400).json({ error: "Title, tag, description, and content are required." });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO blogs (title, tag, image, description, content) VALUES (?, ?, ?, ?, ?)",
      [title, tag, image || null, description, content]
    );
    res.status(201).json({ id: result.insertId, title, tag, image, description, content });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Failed to create blog." });
  }
});

// PUT (update) a blog by ID
app.put("/api/blogs/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, tag, image, description, content } = req.body;

  if (!title || !tag || !description || !content) {
    return res.status(400).json({ error: "Title, tag, description, and content are required." });
  }

  try {
    await pool.query(
      "UPDATE blogs SET title = ?, tag = ?, image = ?, description = ?, content = ? WHERE id = ?",
      [title, tag, image || null, description, content, id]
    );
    res.json({ id: parseInt(id), title, tag, image, description, content });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Failed to update blog." });
  }
});

// DELETE a blog by ID
app.delete("/api/blogs/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM blogs WHERE id = ?", [id]);
    res.json({ message: "Blog deleted successfully." });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Failed to delete blog." });
  }
});

// --- INDUSTRIES ENDPOINTS ---

// GET all industries
app.get("/api/industries", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM industries ORDER BY name ASC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching industries:", error);
    res.status(500).json({ error: "Failed to fetch industries." });
  }
});

// POST (create) a new industry
app.post("/api/industries", verifyToken, async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Industry name is required." });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO industries (name) VALUES (?)",
      [name.trim()]
    );
    res.status(201).json({ id: result.insertId, name: name.trim() });
  } catch (error) {
    console.error("Error creating industry:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "An industry with this name already exists." });
    }
    res.status(500).json({ error: "Failed to create industry." });
  }
});

// PUT (update) an industry name by ID
app.put("/api/industries/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Industry name is required." });
  }

  try {
    await pool.query(
      "UPDATE industries SET name = ? WHERE id = ?",
      [name.trim(), id]
    );
    res.json({ id: parseInt(id), name: name.trim() });
  } catch (error) {
    console.error("Error updating industry:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "An industry with this name already exists." });
    }
    res.status(500).json({ error: "Failed to update industry." });
  }
});

// DELETE an industry by ID
app.delete("/api/industries/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM industries WHERE id = ?", [id]);
    res.json({ message: "Industry deleted successfully." });
  } catch (error) {
    console.error("Error deleting industry:", error);
    res.status(500).json({ error: "Failed to delete industry." });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// Serve static frontend files in production
const frontendBuildPath = path.join(__dirname, "../");
app.use(express.static(frontendBuildPath));

// Handle React Router routing, return index.html for all other non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initDB();
});
// Trigger reload 3
