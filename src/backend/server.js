const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const sql = require("mssql");
const bcrypt = require('bcrypt');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Email credentials
const GMAIL_USER = "innailkiv94@gmail.com";
const GMAIL_PASS = "xfysiazsbrcdtbvf";
const RECIPIENT_EMAIL = "innailkiv94@gmail.com";

// Endpoint to handle form submissions
app.post("/api/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS
        }
    });

    // Email options
    const mailOptions = {
        from: GMAIL_USER,
        to: RECIPIENT_EMAIL,
        subject: "New Message from Your Website",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email");
    }
});

// User registration endpoint
app.post("/api/register", async (req, res) => {
    const { username, password } = req.body; // Get username and password from the request

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        // Here you should store `username` and `hashedPassword` in your database
        // Example SQL insert query:
        const result = await sql.query`INSERT INTO Users (username, password) VALUES (${username}, ${hashedPassword})`;
        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Error registering user");
    }
});

// User login endpoint
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Fetch user from the database
        const result = await sql.query`SELECT * FROM Users WHERE username = ${username}`;
        const user = result.recordset[0];

        if (!user) {
            return res.status(401).send("User not found");
        }

        // Compare the provided password with the hashed password
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.send("Login successful");
        } else {
            res.status(401).send("Incorrect password");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Error during login");
    }
});

// Database connection configuration
const dbConfig = {
    user: "mmarck",
    password: "masterchief1488",
    server: "ilkiv-makeup.database.windows.net",
    database: "ilkiv-makeup",
    options: {
        encrypt: true,
        trustServerCertificate: false,
        port: 1433 // Ensure the port is specified
    }
};


// Connect to the database
sql.connect(dbConfig)
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error("Database connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
