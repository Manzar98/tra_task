
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    name : String,
    email : String,
    movie_id : {
        type : Schema.Types.ObjectId,
        ref: 'movies'
    },
    text : String,
    date : Date
});

module.exports = mongoose.model('comments', commentSchema);
