const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const sql = require("mssql");
const bcrypt = require('bcrypt');
const dbConfig = require('./dbConfig');
const jwt = require("jsonwebtoken");
// const chatbotRoute = require('./chatbotRoute');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const YAHOO_USER = process.env.YAHOO_USER;
const YAHOO_PASS = process.env.YAHOO_PASS;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

const transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    secure: true,
    auth: {
        user: YAHOO_USER,
        pass: YAHOO_PASS
    }
});



if (process.env.USE_DATABASE === 'true') {
  sql.connect(dbConfig)
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error("Database connection error:", err));
}




const optionalVerifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return next(); // Not logged in — just skip

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to req
  } catch (err) {
    // If token is invalid, skip silently
  }

  next();
};

// Middleware to disable database routes when USE_DATABASE is false
const checkDbEnabled = (req, res, next) => {
  if (process.env.USE_DATABASE !== 'true') {
    return res.status(503).send("Database is disabled in alpha mode.");
  }
  next();
};


app.post("/api/send-email", optionalVerifyJWT, async (req, res) => {
  const { name, email: formEmail, message } = req.body;

  if (!name || !message) {
    return res.status(400).send("Name and message are required.");
  }

  // The recipient is always your email (your Yahoo account)
  const recipientEmail = YAHOO_USER;

  // Reply-To should be logged-in user’s email or the email from form
  const replyToEmail = req.user?.email || formEmail;

  if (!replyToEmail) {
    return res.status(400).send("Reply-to email is required.");
  }

const mailOptions = {
  from: YAHOO_USER,
  to: YAHOO_USER,  // sending to yourself
  subject: `New Message from ${name} via Website`,
  text: `Name: ${name}\nEmail: ${formEmail || "Not provided"}\nMessage: ${message}`,
};


try {
  await transporter.sendMail(mailOptions);
  res.send("Email sent successfully");
} catch (error) {
  console.error("Error sending email:", error);
  if (error.response) {
    console.error("SMTP response:", error.response);
  }
  res.status(500).send("Error sending email");
}

});




app.post("/api/register", checkDbEnabled, async (req, res) => {
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

app.post("/api/login", checkDbEnabled, async (req, res) => {
  const { loginId, password } = req.body;

  if (!loginId || !password) {
    return res.status(400).send("Username/email and password are required.");
  }

  try {
    const normalizedInput = loginId.toLowerCase();

    const result = await sql.query`
      SELECT * FROM Users
      WHERE LOWER(Username) = ${normalizedInput} OR LOWER(Email) = ${normalizedInput}
    `;

    const user = result.recordset[0];

    if (!user) {
      return res.status(401).send("User not found");
    }

    const match = await bcrypt.compare(password, user.Password);
    if (match) {
      // login success
      res.send({
        message: "Login successful",
        username: user.Username,
        email: user.Email,
      });
    } else {
      return res.status(401).send("Incorrect password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login");
  }
});



app.post("/api/forgot-password", checkDbEnabled, async (req, res) => {
    const { email } = req.body;

    if (!email) {
        console.log("Forgot password attempt with missing email");
        return res.status(400).send("Email is required.");
    }

    try {
        const normalizedEmail = email.trim().toLowerCase();
        console.log(`Forgot password requested for email: ${normalizedEmail}`);

        // Case-insensitive email search
        const result = await sql.query`
            SELECT * FROM Users WHERE LOWER(Email) = ${normalizedEmail}
        `;

        const user = result.recordset[0];

        if (!user) {
            console.log(`No user found with email: ${normalizedEmail}`);
            return res.status(404).send("No user found with that email.");
        }

        // Generate reset token
        const token = Math.random().toString(36).substr(2);
        console.log(`Generated reset token for user ${user.Username}: ${token}`);

        // Update user with reset token (case-insensitive match again)
        await sql.query`
            UPDATE Users
            SET ResetPasswordToken = ${token}
            WHERE LOWER(Email) = ${normalizedEmail};
        `;
        console.log(`Reset token saved for email: ${normalizedEmail}`);

        const yahooTransporter = nodemailer.createTransport({
            host: "smtp.mail.yahoo.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.YAHOO_USER,
                pass: process.env.YAHOO_PASS,
            },
        });

        const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
        const resetLink = `${FRONTEND_URL}/reset-password?token=${token}`;
        console.log(`Password reset link: ${resetLink}`);

        const mailOptions = {
            from: process.env.YAHOO_USER,
            to: normalizedEmail,
            subject: "Password Reset Request",
            text: `Click the link to reset your password: ${resetLink}`,
        };

        // Send reset email
        await yahooTransporter.sendMail(mailOptions);
        console.log(`Password reset email sent to: ${normalizedEmail}`);

        res.send("Password reset email sent.");
    } catch (error) {
        console.error("Forgot Password Error:", error.message, error.stack);
        res.status(500).send("Error processing password reset.");
    }
});


app.post("/api/reset-password", checkDbEnabled, async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).send("Token and new password are required.");
    }

    try {
        const result = await sql.query`
            SELECT * FROM Users
            WHERE ResetPasswordToken = ${token};
        `;

        const user = result.recordset[0];

        if (!user) {
            return res.status(400).send("Invalid or expired token.");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await sql.query`
            UPDATE Users
            SET Password = ${hashedPassword}, ResetPasswordToken = NULL
            WHERE ResetPasswordToken = ${token};
        `;

        res.send("Password has been reset successfully.");
    } catch (error) {
        res.status(500).send("Error resetting password.");
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
