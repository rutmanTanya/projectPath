const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json()); 
app.use(cors());

// Database Connection
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "document_archive"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL Database");
});

// Get all reports
app.get("/api/reports", (req, res) => {
    db.query("SELECT * FROM reports", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new report
app.post("/api/reports", (req, res) => {
    const { report_name, report_date, details, employee_id } = req.body;

    if (!report_name || !report_date || !employee_id) {
        return res.status(400).json({ error: "Report Name, Date, and Employee ID are required." });
    }

    const sql = "INSERT INTO reports (report_name, report_date, details, employee_id) VALUES (?, ?, ?, ?)";
    db.query(sql, [report_name, report_date, details, employee_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Report added successfully!", id: result.insertId });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});