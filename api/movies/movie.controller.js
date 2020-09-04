var abstract = require('../abstract');
var MOVIE = require('./movie.model');
var controller = abstract(MOVIE);

controller.getMoviesList = (req,res) => {
    let agri = [ { $sample: {size: 20} } ]
    MOVIE.aggregate(agri,function(err,result){
        if(err) { return handleError(res, err); }
        return res.status(200).json({status:true,model:result});
    })
}

module.exports = controller;