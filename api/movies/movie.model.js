var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var movieSchema = new Schema({
  plot: String,
  genres: Array,
  runtime: Number,
  metacritic: Number,
  rated: String,
  cast: Array,
  num_mflix_comments: Number,
  poster: String,
  title: String,
  fullplot: String,
  languages: Array,
  released: Date,
  directors: Array,
  writers: Array,
  awards: Object,
  lastupdated: String,
  year: Number,
  imdb: Object,
  countries: Array,
  type: String,
});

module.exports = mongoose.model("movies", movieSchema);
