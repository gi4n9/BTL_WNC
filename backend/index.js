const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authenticateToken = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data");
const appointmentRoutes = require("./routes/appointment");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Sử dụng routes
app.use("/api/auth", authRoutes); // Đăng ký và đăng nhập: /api/auth/register, /api/auth/login
app.use("/api/data", dataRoutes); // Dữ liệu: /api/data/services, /api/data/stylists
app.use("/api/appointments", appointmentRoutes);

// API lấy thông tin người dùng (bảo vệ bằng token)
app.get("/api/user", authenticateToken, async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "your_password",
      database: process.env.DB_NAME || "your_database_name",
    });
    const [rows] = await connection.execute(
      "SELECT id, username, email, role FROM users WHERE id = ?",
      [req.user.id]
    );
    await connection.end();
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.post("/api/bookings", async (req, res) => {
  const { username, email, phone, service, stylist, date, time } = req.body;

  try {
    const query =
      "INSERT INTO bookings (username, email, phone, service, stylist, date, time) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await db.execute(query, [
      username,
      email,
      phone,
      service,
      stylist,
      date,
      time,
    ]);
    res.json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ success: false, message: "Error saving booking" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
