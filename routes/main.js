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
  // res.render('myproject');
    const username = req.params.username;
  console.log(typeof req);
    console.log(typeof req.params);
  User.findOne({username: req.params.username}, (err, user) => {
      console.log("in main get username");
      if (err) {
          console.log(err);

      }
      else {
          Project.find({author: req.params.username}, function(err, projects){

              if(err){
                  // console.log("first:");
                  // console.log(projects);
                  // res.render('samepledashboard', {
                  //     title: 'My Projects',
                  //
                  //     projects: false,
                  //     author: user
                  console.log(err);
                  //});
              } else{
                  console.log("second:");
                  console.log(projects);
                  res.render('sampledashboard', {
                      title: 'My Projects',

                      projects: projects,
                      author: user
                  });
              }
          });
      }

    });
});

// add a projects
router.get('/:username/newproject', ensureAuthenticated, function(req, res){
    console.log('in new proj');
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
          })
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
