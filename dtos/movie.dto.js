function validateMoviePayload(data) {
    const required = [
        "title", "year", "rated", "released", "runtime", "director",
        "writer", "plot", "language", "country", "awards", "poster",
        "metascore", "imdb_rating", "imdb_votes", "imdb_id", "type", "genre_id"
    ];

    for (let key of required) {
        if (!data[key]) {
            return { valid: false, message: `${key} is required` };
        }
    }

    return { valid: true };
}

module.exports = { validateMoviePayload };
