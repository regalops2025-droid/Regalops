<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = 'localhost';
$db   = 'u903092239_Regalops';
$user = 'u903092239_Regalops';
$pass = 'Regalops@123';
$charset = 'utf8mb4';

echo "<h3>Connecting to database...</h3>";

try {
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, $user, $pass, $options);
    echo "<p style='color:green;'>Connection successful!</p>";

    // Create tables
    echo "<h3>Creating tables...</h3>";

    // 1. contact_enquiries
    $pdo->exec("CREATE TABLE IF NOT EXISTS contact_enquiries (
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
    )");
    echo "<p>Table 'contact_enquiries' checked/created.</p>";

    // 2. users
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    echo "<p>Table 'users' checked/created.</p>";

    // 3. solutions
    $pdo->exec("CREATE TABLE IF NOT EXISTS solutions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(255),
        features TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    echo "<p>Table 'solutions' checked/created.</p>";

    // 4. technologies
    $pdo->exec("CREATE TABLE IF NOT EXISTS technologies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        logo VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    echo "<p>Table 'technologies' checked/created.</p>";

    // 5. blogs
    $pdo->exec("CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR(255) NOT NULL,
        image_path VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    echo "<p>Table 'blogs' checked/created.</p>";

    // Seed default admin user
    $adminEmail = 'regalops2025@gmail.com';
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$adminEmail]);
    $admin = $stmt->fetch();

    if (!$admin) {
        $hashedPassword = password_hash('Regalops@123', PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("INSERT INTO users (email, password, name) VALUES (?, ?, ?)");
        $stmt->execute([$adminEmail, $hashedPassword, 'Admin']);
        echo "<p style='color:green;'>Default admin user seeded!</p>";
    } else {
        echo "<p>Admin user already exists.</p>";
    }

    echo "<h3 style='color:green;'>All done successfully!</h3>";

} catch (\PDOException $e) {
     echo "<p style='color:red;'>Database Error: " . $e->getMessage() . "</p>";
}
?>
