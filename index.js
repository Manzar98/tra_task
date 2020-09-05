const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
app.use(bodyParser({ limit: "1555mb" }));

console.log(process.env.MLAB_DATABASE_URL);
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

const movie = require("./api/movies/movie.controller");

app.post("/api/getMoviesList", movie.getMoviesList);
app.post("/api/getMovieDetails", movie.getMovieDetails);
// app.get('/api/comments',)
// An api endpoint that returns a short list of items
app.get("/api/getList", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);

const string_uri = process.env.MLAB_DATABASE_URL;
mongoose.connect(string_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
  // eslint-disable-next-line no-console
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});
