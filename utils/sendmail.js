const nodemailer = require("nodemailer");

async function sendVerificationEmail(toEmail, token) {
    // const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASS
    //     }
    // });


    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     auth: {
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASS
    //     }
    // });

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
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

    // Kirim email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${toEmail}`);

    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

module.exports = { sendVerificationEmail };
