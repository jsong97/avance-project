var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema(
  {
    "grid_id": {type:String, require:true},
    "name": {type: String},
    "uploadTime": {type: String, required: true},
    //"imageData": {type: Buffer, required: true},
    "imageDescription": {type: String},
    "project_id": {type: String, required: true}
  }
);

// the model is called Image
let Image = module.exports = mongoose.model('Image', imageSchema);
