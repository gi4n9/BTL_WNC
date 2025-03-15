const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

// Cấu hình kết nối MySQL
const createDbConnection = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "your_password",
    database: process.env.DB_NAME || "your_database_name",
  });
};

// API lấy danh sách services
router.get("/services", async (req, res) => {
  try {
    const connection = await createDbConnection();
    const [rows] = await connection.execute("SELECT * FROM services");
    await connection.end();
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

// API lấy danh sách stylists
router.get("/stylists", async (req, res) => {
  try {
    const connection = await createDbConnection();
    const [rows] = await connection.execute("SELECT * FROM stylists");
    await connection.end();
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching stylists:", error);
    res.status(500).json({ error: "Failed to fetch stylists" });
  }
});

module.exports = router;
