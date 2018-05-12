var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema(
  {
    //"user_id": {type: String, required:true},
    "name": {type: String, required: true},
    "author": {type: String, required: true},
    "description": {type: String, required: true}
  }
);

// the model is called Project
let Project = module.exports = mongoose.model('Project', projectSchema);
