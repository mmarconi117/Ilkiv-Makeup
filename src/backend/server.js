const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const sql = require("mssql");
const bcrypt = require('bcrypt');
const dbConfig = require('./dbConfig');
require('dotenv').config();


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

require('dotenv').config();





const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

// Connect to the database
sql.connect(dbConfig)
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error("Database connection error:", err));


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


app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username/email and password are required.");
    }

    try {
        const result = await sql.query`
            SELECT * FROM Users
            WHERE Username = ${username} OR Email = ${username}`;

        const user = result.recordset[0];

        if (!user) {
            return res.status(401).send("User not found.");
        }

        const match = await bcrypt.compare(password, user.Password);
        if (match) {
            res.send({
                message: "Login successful",
                username: user.Username
            });
        } else {
            res.status(401).send("Incorrect password");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Error during login");
    }
});






app.post("/api/forgot-password", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send("Email is required.");
    }

    try {
        // Check if user exists
        const result = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;
        const user = result.recordset[0];

        if (!user) {
            return res.status(404).send("No user found with that email.");
        }

        // Generate token
        const token = Math.random().toString(36).substr(2);

        // Save token in DB:
        await sql.query`
            UPDATE Users
            SET ResetPasswordToken = ${token}
            WHERE Email = ${email};
        `;

        // Send email
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
        const resetLink = `${FRONTEND_URL}/reset-password?token=${token}`;

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            text: `Click the link to reset your password: ${resetLink}`,
        };

        await transporter.sendMail(mailOptions);

        res.send("Password reset email sent.");
    } catch (error) {
        console.error("Error sending password reset email:", error);
        res.status(500).send("Error processing password reset.");
    }
});


app.post("/api/reset-password", async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).send("Token and new password are required.");
    }

    try {
        // Find user by token:
        const result = await sql.query`
            SELECT * FROM Users
            WHERE ResetPasswordToken = ${token};
        `;

        const user = result.recordset[0];

        if (!user) {
            return res.status(400).send("Invalid or expired token.");
        }

        // Hash new password:
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password + clear token:
        await sql.query`
            UPDATE Users
            SET Password = ${hashedPassword}, ResetPasswordToken = NULL
            WHERE ResetPasswordToken = ${token};
        `;

        res.send("Password has been reset successfully.");
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).send("Error resetting password.");
    }
});



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send({
        error: {
            message: err.message || "An internal server error occurred.",
        },
    });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
