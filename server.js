const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "task_manager"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected");
});

// Handle form submit
app.post("/add-task", (req, res) => {
    const { name, email, task, priority } = req.body;

    const sql = `
        INSERT INTO tasks (name, email, task, priority)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, email, task, priority], (err) => {
        if (err) throw err;
        res.send("<h2>✅ Task added successfully</h2><a href='/'>Go Back</a>");
    });
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

