var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
  {
    "name": {type: String, required: true},
    "username": {type: String, required: true},
    "password": {type: String, required: true},
    "email": {type: String, required: true}
  }
);

// the model is called users
const User = module.exports = mongoose.model('User', userSchema);
