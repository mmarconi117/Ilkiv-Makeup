const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Added CORS middleware

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Added CORS middleware
app.use(cors());

// Email credentials
const GMAIL_USER = "michaelmarck117@gmail.com";
const GMAIL_PASS = "zlbhekrcrxenacuu";
const RECIPIENT_EMAIL = "michaelmarck117@gmail.com";

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
        // Send the email
        await transporter.sendMail(mailOptions);
        res.send("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
