const express = require('express');
const app = express();
require('dotenv').config();

const movieRoutes = require('./routes/movie.route');

app.use(express.json());
app.use('/movie', movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
