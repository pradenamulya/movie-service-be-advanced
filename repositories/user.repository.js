const db = require("../config/db");

const createUser = (user) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO users SET ?", user, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
        });
    });
};

const findUserByToken = (token) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE verification_token = ?", [token], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
        });
    });
};

const verifyUser = (token) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE users SET is_verified = 1, verification_token = NULL WHERE verification_token = ?", [token], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

module.exports = { createUser, findUserByEmail, findUserByToken, verifyUser };
