var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema(
  {
    "project_id": {type: Number, required: true},
    "name": {type: String, required: true},
    "username": {type: String, required: true}
  }
);

// the model is called users
module.exports = mongoose.model('projects', projectSchema);
