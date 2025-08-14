const repo = require("../repositories/movie.repository");
const Movie = require("../models/movie.model");

const getAllMovies = (queryParams) => {
    return repo.getAllMovies(queryParams);
};
const getMovieById = (id) => repo.getMovieById(id);

const createMovie = (data) => {
    const movie = new Movie(data);
    return repo.insertMovie(movie);
};

const updateMovieById = (id, data) => {
    const movie = new Movie(data);
    return repo.updateMovie(id, movie);
};

const deleteMovieById = (id) => repo.deleteMovie(id);

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovieById,
    deleteMovieById
};
