var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema(
  {
    "name": {type: String, required: true},
    "imageSpot": {type: String, required: true},
    "imagePath": {type: String, required: true},
    "imageDescription": {type: String, required: true},
    "project_id": {type: Number, required: true}
  }
);

// the model is called Image
let Image = module.exports = mongoose.model('Image', imageSchema);
