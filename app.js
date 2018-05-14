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
  gfs.collection('images');
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
let Project_Image = require('./models/project_image');

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

//global db connection
//app.set('gfsConn', gfs);

app.get('/grid-images/:projId/:imageId/grid/:imageFileName', (req, res) => {

    console.log('finding one image');
    //Image.files.find(req.params.imageGridId, function (err, file) {
     gfs.files.findOne({filename: req.params.imageFileName}, (err, file) => {

        // Check if file
         if (!file || file.length === 0) {
             return res.status(404).json({
                 err: 'No file exists'
             });
         }

        if (err) {
            console.log(err);
        } else {
            console.log("got file");
            console.log(console.log(file.filename));

            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
            //return res.json(file);

        }


    });
});



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
let image = require('./routes/image');
app.use('/image', image);

// add project comment
let addComment = require('./routes/addComment');
app.use('/comments', addComment);

//
/*app.use(multer({ dest: './uploads/',
rename: function (fieldname, filename) {
    return filename;
},
}));*/

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});
