const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

const movieRoutes = require('./routes/movie.route');
const authRoutes = require('./routes/auth.route');
const uploadRoutes = require('./routes/upload.route');

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use('/movie', movieRoutes);

app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
