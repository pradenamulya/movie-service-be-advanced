const service = require("../services/movie.service");
const { validateMoviePayload } = require("../dtos/movie.dto");
const { successResponse, errorResponse } = require("../utils/response");

exports.getAll = async (req, res) => {
    try {
        const result = await service.getAllMovies();
        res.json(successResponse("List of movies", result));
    } catch (err) {
        res.status(500).json(errorResponse("Failed to fetch movies", err.message));
    }
};

exports.getById = async (req, res) => {
    try {
        const result = await service.getMovieById(req.params.id);
        if (!result) {
            return res.status(404).json(errorResponse("Movie not found"));
        }
        res.json(successResponse("Movie fetched successfully", result));
    } catch (err) {
        res.status(500).json(errorResponse("Failed to fetch movie", err.message));
    }
};

exports.create = async (req, res) => {
    const validation = validateMoviePayload(req.body);
    if (!validation.valid) {
        return res.status(400).json(errorResponse(validation.message));
    }

    try {
        await service.createMovie(req.body);
        res.status(201).json(successResponse("Movie created successfully"));
    } catch (err) {
        res.status(500).json(errorResponse("Failed to create movie", err.message));
    }
};

exports.update = async (req, res) => {
    const validation = validateMoviePayload(req.body);
    if (!validation.valid) {
        return res.status(400).json(errorResponse(validation.message));
    }

    try {
        await service.updateMovieById(req.params.id, req.body);
        res.json(successResponse("Movie updated successfully"));
    } catch (err) {
        res.status(500).json(errorResponse("Failed to update movie", err.message));
    }
};

exports.remove = async (req, res) => {
    try {
        await service.deleteMovieById(req.params.id);
        res.json(successResponse("Movie deleted successfully"));
    } catch (err) {
        res.status(500).json(errorResponse("Failed to delete movie", err.message));
    }
};
