const db = require("../config/db");

const getAllMovies = (filters = {}) => {
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM series_film";
        let conditions = [];
        let params = [];

        if (filters.type) {
            conditions.push("type = ?");
            params.push(filters.type);
        }
        if (filters.genre_id) {
            conditions.push("genre_id = ?");
            params.push(filters.genre_id);
        }

        if (filters.search) {
            conditions.push("(title LIKE ? OR director LIKE ? OR writer LIKE ?)");
            params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        if (filters.sort_by) {
            const order = filters.order && filters.order.toUpperCase() === "DESC" ? "DESC" : "ASC";
            query += ` ORDER BY ${filters.sort_by} ${order}`;
        }

        db.query(query, params, (err, results) => {
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
