var _ = require('lodash');

var controller = function(Model) {
    return {
        // Get a single model
        show : function(req, res) {
          Model.findById(req.body.id, function (err, model) {
            if(err) { return handleError(res, err); }
            if(!model) { return res.status(404).json({status:false,message:'Not Found'}); }
            return res.json({status:true,model:model});
          });
        }
    }
    function handleError(res, err) {
      return res.status(500).json({status:false,message:err});
    }
}
module.exports = controller;
