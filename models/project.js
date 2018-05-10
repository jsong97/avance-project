var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema(
  {
    "name": {type: String, required: true},
    "author": {type: String, required: true},
    "description": {type: String, required: true}
  }
);

// the model is called Project
let Project = module.exports = mongoose.model('Project', projectSchema);
