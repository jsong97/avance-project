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
let Project_Image = require('../models/project_image');
let Comments = require('../models/comments');

var explore_project_images = [];

// after login
router.get('/', function(req, res){
  Project.find({}, function(err, projects){
    if(err){
      console.log(err);
    } else{
      if (explore_project_images.length == 0){
        // will need to create an array
        projects.forEach(function(project){
          Project_Image.find({project_id: project._id}, function(err, images){
            if (err) {
              console.log(err);
              console.log("no images for this project\n");
              explore_project_images.push({});
            } else {
              console.log("pushed one set of images");
              explore_project_images.push(images);
              console.log(explore_project_images);
            }
          });
        });
      }
      console.log("exlore_project_images is (2): ");
      console.log(explore_project_images);
      res.render('home', {
        title: 'My Projects',
        projects: projects,
        images: explore_project_images
      });
    }
  });
});

router.get("/search", function(req, res){
  // first, check if we searched for something
  if (req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Project.find({name: regex}, function(err, projects){
      if(err){
        console.log(err);
      } else {
        res.render('search-projects', {
          projects: projects
        })
      }
    });
  }
  // otherwise, load all projects
  else {
    Project.find({}, function(err, projects){
      if (err){
        console.log(err);
      } else {
        res.render('search-projects', {
          projects: projects
        });
      }
    });
  }
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

var all_images = [];

// after login
router.get('/:username', ensureAuthenticated, function(req, res){
  // res.render('myproject');
  const username = req.params.username;
  User.findOne({username: req.params.username}, (err, user) => {
    if (err) {
      console.log(err);
    }
    else {
      Project.find({author: req.params.username}, function(err, projects){
        if(err){
          console.log(err);
        } else{
          if (all_images.length < (projects.length)){
            // will need to create an array
            console.log(username);
            projects.forEach(function(project){
              Project_Image.find({project_id: project._id}, function(err, images){
                if (err) {
                  console.log(err);
                  console.log("no images for this project\n");
                  all_images.push({});
                } else {
                  console.log("pushed one set of images");
                  all_images.push(images);
                  console.log(all_images);
                }
              });
            });
          }
          console.log("all images is (2): ");
          console.log(all_images);
          res.render('sampledashboard', {
            title: 'My Projects',
            projects: projects,
            author: user,
            images: all_images
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
    //var gfs = req.app.get("gfs");
    if (err) {
      console.log(err);
    } else {
      Project_Image.find({project_id: req.params.projectId}, function(err, images){
        if (err) {
          Comments.find({project_id: req.params.projectId}, function(err, comments){
            if (err){
              res.render('project', {
                images: false,
                project: project,
                comments: false
              });
            } else {
              res.render('project', {
                images: false,
                project: project,
                comments: comments
              });
            }
          });

        } else {
          Comments.find({project_id: req.params.projectId}, function(err, comments){
            if (err){
              res.render('project', {
                images: images,
                comments: false,
                project: project
              });
            } else {
              res.render('project', {
                images: images,
                comments: comments,
                project: project
              });
            }
          });
        }
      });
    }
  });
});

// delete from project-image view
router.delete('/:username/:projectId', function(req, res){
  let query = {
    _id:req.params.projectId
  }

  Project.remove(query, function(err){
    if(err){
      console.log(err);
    } else {
      res.send('Success');
    }
  });
});

function escapeRegex(text){
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

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
