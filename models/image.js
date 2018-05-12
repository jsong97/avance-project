var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema(
  {
    "grid_id": {type:Number, required:true},
    "name": {type: String, required:true},
    "uploadDay": {type: String, required: true},
    "uploadMonth": {type: String, required: true},
    //"imageData": {type: Buffer, required: true},
    "imageDescription": {type: String, required:true},
    "project_id": {type: Number, required: true}
  }
);

// the model is called Image
let Image = module.exports = mongoose.model('Image', imageSchema);
