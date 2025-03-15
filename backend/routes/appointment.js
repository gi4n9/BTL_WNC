const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

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

// API lấy toàn bộ danh sách appointments
router.get("/", async (req, res) => {
  try {
    const db = await createDbConnection();
    const [rows] = await db.execute("SELECT * FROM appointments");
    await db.end();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, phone, service, stylist, date, time, status } = req.body;

    // Log dữ liệu nhận được để debug
    console.log("Request body:", req.body);

    // Tạo câu lệnh SQL động dựa trên các trường có trong req.body
    const fields = [];
    const values = [];

    if (username !== undefined) {
      fields.push("username = ?");
      values.push(username);
    }
    if (phone !== undefined) {
      fields.push("phone = ?");
      values.push(phone);
    }
    if (service !== undefined) {
      fields.push("service = ?");
      values.push(service);
    }
    if (stylist !== undefined) {
      fields.push("stylist = ?");
      values.push(stylist);
    }
    if (date !== undefined) {
      fields.push("date = ?");
      values.push(date);
    }
    if (time !== undefined) {
      fields.push("time = ?");
      values.push(time);
    }
    if (status !== undefined) {
      fields.push("status = ?");
      values.push(status);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "Không có dữ liệu để cập nhật" });
    }

    const sql = `UPDATE appointments SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    const db = await createDbConnection();
    const [result] = await db.execute(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Không tìm thấy lịch hẹn" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(
      "Lỗi chi tiết khi cập nhật:",
      error.sqlMessage || error.message
    );
    res
      .status(500)
      .json({ error: "Không thể cập nhật dữ liệu", details: error.sqlMessage });
  }
});

module.exports = router;
