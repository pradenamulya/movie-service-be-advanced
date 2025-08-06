const db = require("../config/db");

const getAllMovies = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM series_film", (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM series_film WHERE film_id = ?", [id], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
        });
    });
};

const insertMovie = (movie) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO series_film SET ?", movie, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const updateMovie = (id, movie) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE series_film SET ? WHERE film_id = ?", [movie, id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const deleteMovie = (id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM series_film WHERE film_id = ?", [id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

module.exports = {
    getAllMovies,
    getMovieById,
    insertMovie,
    updateMovie,
    deleteMovie
};
