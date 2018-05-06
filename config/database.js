// Create the database
var mongoose = require('mongoose');
var userSchema = require('../models/user.js');

// convert this into an environment variable
// var DB_URL = process.env.
var DB_URL = 'mongodb://jsong97:1cabbages@ds014658.mlab.com:14658/info30005_avance';

// mongoose.connect(DB_URL, function(err){
//   if (!err){
//     console.log('Connected to mongo');
//   } else {
//     console.log('Failed to connect to mongo');
//   }
// });

module.exports = {
  database: DB_URL,
  secret: 'yoursecret'
}
