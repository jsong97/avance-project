const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const session = require('express-session');
const multer = require('multer');
const gridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const grid = require('gridfs-stream');
const methodOverride = require('method-override');





const PORT = process.env.PORT || 3000;

// Database Setup
const config = require('./config/database');
var mongoose = require('mongoose');
mongoose.connect(config.database);
let db = mongoose.connection;
let gfs;
db.once('open', function(){
  gfs = grid(db.db, mongoose.mongo);
  gfs.collection('image');
  gfs.collection('projects');
  gfs.collection('users');
  console.log('Connected to MongoDB');
});

// create storage engine
/*const storage = new gridFsStorage({
    url: config.database,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);

          }

          const filename = buf.toString('hex') + path.extname(file.originalName);
          const fileInfo = {
            filename: filename,
            bucketName: 'images'
          };
          resolve(fileInfo);
        });
      });
    }
})

const upload = multer({storage});
// get request omitted
app.post('/upload', upload.single('fileToUpload'), (req, res) => {
  res.json({file:req.file});
});*/


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
let Image = require('./models/image');

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

// global db connection
//app.set("gfs", gfs);

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// ====== Routes ======
// Explore page
let explore = require('./routes/explore');
app.use('/explore', explore);

//let project = require('./routes/projects');
//app.use('/projects', project);

// Home page
let main = require('./routes/main');
app.use('/', main);

// Image
//let image = require('./routes/image');
//app.use('/image', image);

//
/*app.use(multer({ dest: './uploads/',
rename: function (fieldname, filename) {
    return filename;
},
}));*/

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});
