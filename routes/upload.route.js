const express = require("express");
const router = express.Router();
const upload = require("../services/upload.service");
const uploadController = require("../controllers/upload.controller");

router.post("/", upload.single("image"), uploadController.uploadFile);

module.exports = router;
