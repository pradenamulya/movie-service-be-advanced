const nodemailer = require("nodemailer");

async function sendVerificationEmail(toEmail, token) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const verifyUrl = `${process.env.APP_URL}/auth/verifikasi-email?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: "Email Verification - Movie App",
        html: `
            <h3>Verify Your Email</h3>
            <p>Click the link below to verify your account:</p>
            <a href="${verifyUrl}">${verifyUrl}</a>
        `
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendVerificationEmail };
