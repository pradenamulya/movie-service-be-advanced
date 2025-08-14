const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const userRepo = require("../repositories/user.repository");
const { sendVerificationEmail } = require("../utils/sendmail");

const register = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const verificationToken = uuidv4();

    const user = {
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        password: hashedPassword,
        verification_token: verificationToken,
        tanggal_daftar: new Date(),
        status_langganan: "non-aktif"
    };

    await userRepo.createUser(user);

    setImmediate(() => {
        sendVerificationEmail(data.email, verificationToken)
            .catch(err => console.error("Failed to send verification email:", err));
    });
    // await sendVerificationEmail(data.email, verificationToken);

    return verificationToken;
};

const login = async (email, password) => {
    const user = await userRepo.findUserByEmail(email);
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    const token = jwt.sign(
        { id: user.user_id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return { token, user };
};

const verifyEmail = async (token) => {
    const user = await userRepo.findUserByToken(token);
    if (!user) return false;

    await userRepo.verifyUser(token);
    return true;
};

module.exports = { register, login, verifyEmail };
