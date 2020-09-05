const MOVIE = require("./movie.model");
const COMMENT = require("../comments/comment.model");
const controller = {};

controller.getMoviesList = (req, res) => {
  try {
    let agri = [{ $sample: { size: 10 } }];
    MOVIE.aggregate(agri, function (err, result) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json({ status: true, model: result });
    });
  } catch (error) {
    console.log(error, "Error in getting Movies List");
  }
  // COMMENT.find({movie_id:"573a13fbf29313caabdee03b"}).populate("movie_id").exec((err, posts) => {
  //   console.log("Populated User " + posts);
  //   res.send(posts)
  // })
};

controller.getMovieDetails = (req, res) => {
  try {
    let id = req.body.movie_id;
    let con = { _id: id };
    let commentArray = [];
    MOVIE.findOne(con, async function (err, model) {
      if (err) {
        return console.log(res, err);
      }
      if (!model) {
        return res.status(404).json({ status: false, message: "Not Found" });
      }
      if (model.length == 0) {
        return res.status(200).json({ status: false, model: model });
      }

      let coms = await COMMENT.find({ movie_id: id }).exec();
      coms.map((item) => {
        commentArray.push(item);
      });
      model._doc["comments"] = commentArray;
      return res.status(200).json({ status: true, model: model });
    });
  } catch (error) {
    console.log(error, "Error in getting Movie Detail");
  }
};

module.exports = controller;
