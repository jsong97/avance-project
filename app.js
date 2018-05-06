const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const session = require('express-session');

const PORT = process.env.PORT || 3000;

// Database Setup
const config = require('./config/database');
var mongoose = require('mongoose');
mongoose.connect(config.database);
let db = mongoose.connection;

db.once('open', function(){
  console.log('Connected to MongoDB');
});

db.on('error', function(err){
  console.log(err);
});


// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


// Bring in Models
let User = require('./models/user');
let Project = require('./models/project');

// Session config
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(require('connect-flash')());
app.use(function (req, res, next){
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value){
    var namespace = param.split('.')
    , root = namepsace.shift()
    , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Passport config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// global user variable
app.get("*", function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// ====== Routes ======
// Explore page
let explore = require('./routes/explore');
app.use('/explore', explore);

let project = require('./routes/projects');
app.use('/projects', project);

// Home page
let main = require('./routes/main');
app.use('/', main);


app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});
