const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const path = require('path');
const multer = require('multer');
const gridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const grid = require('gridfs-stream');
const methodOverride = require('method-override');


// Bring in controller
var controller = require('../controllers/controller.js');


let User = require('../models/user');
let Project = require('../models/project');
let Image = require('../models/image');

router.get("/", function(req, res){
  res.render('home');
});


// changing login for now
router.get('/login', function(req, res){
  User.find({}, function(err, users){
    if(err){
      console.log(err);
    } else {
      res.render('login', {
        title: 'Add Project',
        users: users
      });
    }
  });
});


// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Logout Process
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/');
});

// register route
router.get('/register', function(req, res){
  res.render('register', {
    title:'Register User'
  });
});

// create a user
router.post('/register', controller.createUser);

// after login
router.get('/:username', ensureAuthenticated, function(req, res){
  // res.render('myprojects');
  console.log(req.params.username);
  User.find({username: req.params.username}, (err, user) => {
    console.log("in main get username");
    console.log(user);
    if (err) {
      return;
    }
    Project.find({}, function(err, projects){
      if(err){
        res.render('samepledashboard', {
          title: 'My Projects',
          projects: false,
          author: user
        });
      } else{
        res.render('sampledashboard', {
          title: 'My Projects',
          projects: projects,
          author: user
        });
      }
    });
    if(err){
      console.log(err);
    }
  });
});

// add a project
router.get('/:username/newproject', ensureAuthenticated, function(req, res){
    res.render('newproject', {
        title: "New Project"
    });
});


router.post('/:username/newproject', controller.createProject);


// get project (with multiple images)
router.get('/:username/:projectId', ensureAuthenticated, function(req, res){
  Project.findById(req.params.projectId, function(err, project){
  //var gfs = app.get("gfs");
    if (err) {
      res.status(404).json({
        err: 'No file exists'
      });
      return;
    }
    Image.find({project_id: project._id}, function(err, images){
      //gfs.files.find({_id:images.grid_id}).toArray((err, files) => {
      if (err) {// || files.length === 0) {
        res.render('project', {
          images: false,
            project: project
          });
        } else {
            // in post make sure png n jpeg only -CHANGE FOR THIS
            res.render('project', {
            images: images,
            project: project
        });
      }
    });
  });
});


// get upload page
router.get('/:username/:projectId/upload', ensureAuthenticated, function(req, res){
    Project.findById(req.params.projectId, function(err, project){
        User.findById(project.author, function(err, user){
            res.render('upload', {
                project: project,
                title: 'Add Project'
            });
        });
        return;
    });
});

// create storage engine
const config = require('../config/database');
const storage = new gridFsStorage({
    url: config.database,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);

                }
                console.log(file.originalname);
                const filename = buf.toString('hex') + path.extname(file.originalname);
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
router.post('/:username/:projectId/upload', upload.single('fileToUpload'), (req, res) => {
    let time = new Date();
    const name = req.body.name;
    const projectId = req.params.projectId;
    const imageDescription = req.body.description;
    //const imageData = fs.readFileSync(req.body.fileToUpload);
    const grid_id = req.file._id;
    const uploadTime = time.toLocaleString();

    let newImage = new Image({
        name:name,
        //projectId:projectId,
        imageDescription:imageDescription,
        //imageData:imageData,
        grid_id: grid_id,
        uploadTime:uploadTime,
        project_id: projectId
    });


    newImage.save(function(err) {
        if (err) {
            res.flash("Something went wrong!");
            res.redirect(':id/:projectId/upload');
        }
        res.end("File uploaded sucessfully!.");
        res.redirect(':id/:projectId');
    });

});

router.get('/image/:imageId', (req, res) => {
    Image.findById(req.params.imageId, function(err, image){
        gfs.files.findOne({ _id: image.grid_id }, (err, file) => {
            // Check if file
            if (!file || file.length === 0) {
                return res.status(404).json({
                    err: 'No file exists'
                });
            }

            // Check if image
            //if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                // Read output to browser
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
           // } else {
            //    res.status(404).json({
            //        err: 'Not an image'
            //    });
           // }

    });
});

// Get one image of a project
router.get('/:username/:id/:imageId', ensureAuthenticated, function(req, res){
    Image.findById(req.params.imageId, (err, image) => {


      //gfs.files.findOne({_id: image.grid_id}, (err, file) => {
        if (!image ){//| file.length === 0) {
            res.render('project-image', {image: false});

        } else {
            // in post make sure png n jpeg only -CHANGE FOR THIS
            res.render('project-image', {image: image});
        }
      });
    });
});




// Access control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/login');
    }
}

module.exports = router;
