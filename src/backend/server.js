const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const sql = require("mssql");
const bcrypt = require('bcrypt');
const dbConfig = require('./dbConfig'); // Import your DB config

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Email credentials
const GMAIL_USER = "innailkiv94@gmail.com";
const GMAIL_PASS = "xfysiazsbrcdtbvf";
const RECIPIENT_EMAIL = "innailkiv94@gmail.com";

// Connect to the database
sql.connect(dbConfig)
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error("Database connection error:", err));

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
    const { username, password, email } = req.body;

    try {
        // Check if the username or email already exists
        const result = await sql.query`
            SELECT * FROM Users WHERE Username = ${username} OR Email = ${email}`;

        if (result.recordset.length > 0) {
            // If a record exists with the same username or email
            return res.status(400).send("Username or email is already taken");
        }

        // If the username and email are unique, hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        await sql.query`
            INSERT INTO Users (Username, Password, Email)
            VALUES (${username}, ${hashedPassword}, ${email})`;

        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error("Error registering user:", error); // Log the full error object

        if (error.code === 'EREQUEST') {
            return res.status(400).send("Invalid request. Please check your input.");
        }

        res.status(500).send("Error creating account");
    }
});



// User login endpoint
app.post("/api/register", async (req, res) => {
    const { username, password, email } = req.body;

    // Input validation
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
        // Check if the username or email already exists
        const result = await sql.query`
            SELECT * FROM Users WHERE Username = ${username} OR Email = ${email}`;

        if (result.recordset.length > 0) {
            return res.status(400).send("Username or email is already taken");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
