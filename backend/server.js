import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// MySQL connection pool settings
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "regalops_db",
  port: parseInt(process.env.DB_PORT || "3306"),
};

let pool;

async function initDB() {
  try {
    pool = mysql.createPool(dbConfig);
    
    // Test connection
    const conn = await pool.getConnection();
    console.log("Successfully connected to MySQL database.");
    conn.release();

    // Create contact_enquiries table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        phone VARCHAR(255),
        message TEXT NOT NULL,
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

    // Seed default admin user if not exists
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", ["admin@regalops.com"]);
    if (rows.length === 0) {
      await pool.query(
        "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
        ["admin@regalops.com", "admin123", "Regal Admin"]
      );
      console.log("Seeded default admin user: admin@regalops.com / admin123");
    }
  } catch (error) {
    console.error("Database initialization failed:", error.message);
  }
}

// Routes
app.post("/api/contact", async (req, res) => {
  const { fullName, email, company, phone, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: "Full name, email and message are required." });
  }

  try {
    await pool.query(
      "INSERT INTO contact_enquiries (full_name, email, company, phone, message) VALUES (?, ?, ?, ?, ?)",
      [fullName, email, company || null, phone || null, message]
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
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

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

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initDB();
});
