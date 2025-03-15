const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/auth"); // Import middleware

// Cấu hình kết nối MySQL
const createDbConnection = async () => {
  try {
    return await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "your_password",
      database: process.env.DB_NAME || "your_database_name",
    });
  } catch (error) {
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

// Middleware để kiểm tra đầu vào
const validateInput = (req, res, next) => {
  const { username, email, password, role, phone } = req.body;
  if (!username || !email || !password || !role || !phone) {
    return res.status(400).json({
      error: "All fields (username, email, password, role, phone) are required",
    });
  }
  if (!["user", "stylist", "admin"].includes(role)) {
    return res
      .status(400)
      .json({ error: "Invalid role. Must be user, stylist, or admin" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: "Invalid phone number format" });
  }
  next();
};

// Đăng ký
router.post("/register", validateInput, async (req, res) => {
  const { username, email, password, role, phone } = req.body;

  let connection;
  try {
    connection = await createDbConnection();
    const [existingUser] = await connection.execute(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ error: "Email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await connection.execute(
      "INSERT INTO users (username, email, password, role, phone) VALUES (?, ?, ?, ?, ?)",
      [username, email, hashedPassword, role, phone]
    );
    await connection.end();
    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    if (connection) await connection.end();
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Đăng nhập
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let connection;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    connection = await createDbConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    await connection.end();

    if (rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET is not configured" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
        phone: user.phone, // Thêm phone vào token
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      message: "Login successful",
      token,
      role: user.role,
      username: user.username,
      email: user.email,
      phone: user.phone, // Trả về phone trong response
    });
  } catch (error) {
    if (connection) await connection.end();
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Đặt lịch (booking)
router.post("/bookings", authenticateToken, async (req, res) => {
  const { service, stylist, date, time } = req.body;
  const { username, email, phone } = req.user; // Lấy thông tin từ token

  let connection;
  try {
    connection = await createDbConnection();
    const [result] = await connection.execute(
      "INSERT INTO appointments (username, email, phone, service, stylist, date, time) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [username, email, phone, service, stylist, date, time]
    );
    await connection.end();
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      bookingId: result.insertId,
    });
  } catch (error) {
    if (connection) await connection.end();
    console.error("Error saving booking:", error);
    res.status(500).json({ success: false, message: "Error saving booking" });
  }
});

module.exports = router;
