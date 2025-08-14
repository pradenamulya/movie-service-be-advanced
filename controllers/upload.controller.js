const { successResponse, errorResponse } = require("../utils/response");

exports.uploadFile = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json(errorResponse("No file uploaded"));
        }
        res.json(successResponse("File uploaded successfully", {
            filename: req.file.filename,
            path: `/uploads/${req.file.filename}`,
            pathUrl: `${process.env.APP_URL}/uploads/${req.file.filename}`
        }));
    } catch (err) {
        res.status(500).json(errorResponse("File upload failed", err.message));
    }
};
