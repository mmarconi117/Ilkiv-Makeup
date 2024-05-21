const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle form submissions
app.post("/api/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "your-email@gmail.com",
            pass: "your-password"
        }
    });

    // Email options
    const mailOptions = {
        from: "your-email@gmail.com",
        to: "recipient-email@example.com",
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
