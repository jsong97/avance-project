var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema(
  {
    "name": {type: String},
    "uploadTime": {type: String, required: true},
    "imageData": {type: Buffer, required: true},
    "imageDescription": {type: String},
    "projectId": {type: Number, required: true}
  }
);

// the model is called Image
let Image = module.exports = mongoose.model('Image', imageSchema);
