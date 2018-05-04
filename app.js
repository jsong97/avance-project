const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

// Database Setup
const config = require('./config/database');
var mongoose = require('mongoose');
mongoose.connect(config.database);
let db = mongoose.connection;



// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// ====== Routes ======
// User login page
let users = require('./routes/users');
app.use('/users', users);

// Explore page
let explore = require('./routes/explore');
app.use('/explore', explore);

// Home page
let main = require('./routes/main');
app.use('/', main);


app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});
