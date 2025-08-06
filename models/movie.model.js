class Movie {
    constructor(data) {
        this.title = data.title;
        this.year = data.year;
        this.rated = data.rated;
        this.released = data.released;
        this.runtime = data.runtime;
        this.director = data.director;
        this.writer = data.writer;
        this.plot = data.plot;
        this.language = data.language;
        this.country = data.country;
        this.awards = data.awards;
        this.poster = data.poster;
        this.metascore = data.metascore;
        this.imdb_rating = data.imdb_rating;
        this.imdb_votes = data.imdb_votes;
        this.imdb_id = data.imdb_id;
        this.type = data.type;
        this.genre_id = data.genre_id;
    }
}

module.exports = Movie;
