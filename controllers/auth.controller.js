const authService = require("../services/auth.service");
const { successResponse, errorResponse } = require("../utils/response");

exports.register = async (req, res) => {
    try {
        await authService.register(req.body);
        res.status(201).json(successResponse("User registered successfully"));
    } catch (err) {
        res.status(500).json(errorResponse("Registration failed", err.message));
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await authService.login(email, password);
        if (!result) {
            return res.status(401).json(errorResponse("Email or password is incorrect"));
        }

        if (!result.user.is_verified) {
            return res.status(403).json(errorResponse("Please verify your email before logging in"));
        }

        res.json(successResponse("Login successful", { token: result.token }));
    } catch (err) {
        res.status(500).json(errorResponse("Login failed", err.message));
    }
};



exports.verifyEmail = async (req, res) => {
    try {
        const token = req.query.token;
        const verified = await authService.verifyEmail(token);
        if (!verified) {
            return res.status(400).json(errorResponse("Invalid Verification Token"));
        }
        res.json(successResponse("Email Verified Successfully"));
    } catch (err) {
        res.status(500).json(errorResponse("Verification failed", err.message));
    }
};