const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const sql = require("mssql");
const bcrypt = require('bcrypt');
const dbConfig = require('./dbConfig');
require('dotenv').config();


const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

require('dotenv').config();



// Your existing code


const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

// Connect to the database
sql.connect(dbConfig)
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error("Database connection error:", err));

// Endpoint to handle form submissions
app.post("/api/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS
        }
    });

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
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).send("Username, password, and email are required.");
    }
    if (password.length < 6) {
        return res.status(400).send("Password must be at least 6 characters long.");
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).send("Invalid email format.");
    }

    try {
        const result = await sql.query`
            SELECT * FROM Users WHERE Username = ${username} OR Email = ${email}`;

        if (result.recordset.length > 0) {
            return res.status(400).send("Username or email is already taken");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await sql.query`
            INSERT INTO Users (Username, Password, Email)
            VALUES (${username}, ${hashedPassword}, ${email})`;

        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error("Error registering user:", error);

        if (error.code === 'EREQUEST') {
            return res.status(400).send("Invalid request. Please check your input.");
        }

        res.status(500).send("Error creating account");
    }
});

// User login endpoint
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }

    try {
        const result = await sql.query`SELECT * FROM Users WHERE Username = ${username}`;
        const user = result.recordset[0];

        if (!user) {
            return res.status(401).send("User not found");
        }

        const match = await bcrypt.compare(password, user.Password);
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
