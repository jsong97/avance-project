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

//router.get('/forum', function(req, res, next){
//  var users = User.find();
//  res.render('forum', { title: 'Users', users: users});
//});

router.get('/mission', function(req, res){
  res.render('mission');
});

router.get('/support', function(req, res){
  res.render('support');
});

router.get('/team', function(req, res){
  res.render('team');
});


router.get('/:username', function(req, res){
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
          console.log(err);
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

// get project (with multiple images)
router.get('/:username/:projectId', function(req, res){
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


// Get one image of a project
router.get('/:id/:imageId', function(req, res){
  Project_Image.findById(req.params.imageId, (err, image) => {
    if (err) {
      console.log(err);
    }
    else {
      // in post make sure png n jpeg only -CHANGE FOR THIS
      Project.findById(image.project_id, function(err, project) {
          if (err) {
              console.log(err);
          }
          else {
             res.render('project-image', {image: image, project:project});

          }
      });
    }
  });
});


/*

router.get('/:id', function(req, res){
  res.render('other-user');
});

// all the different projects ////////////////
router.get('/1/1', function(req, res){
  res.render('./demo_projects/user_1_project');
});

router.get('/1/2', function(req, res){
  res.render('./demo_projects/user_2_project');
});

router.get('/1/3', function(req, res){
  res.render('./demo_projects/user_3_project');
});

router.get('/1/4', function(req, res){
  res.render('./demo_projects/user_4_project');
});

router.get('/1/5', function(req, res){
  res.render('./demo_projects/user_5_project');
});

router.get('/1/6', function(req, res){
  res.render('./demo_projects/user_6_project');
});

router.get('/1/7', function(req, res){
  res.render('./demo_projects/user_7_project');
});

router.get('/1/8', function(req, res){
  res.render('./demo_projects/user_8_project');
});

router.get('/1/9', function(req, res){
  res.render('./demo_projects/user_9_project');
});

//////////////////////////////////////////////

router.get('/:id/:id', function(req, res){
  res.render('other-user-project');
});

router.get('/:id/:id/:id', function(req, res){
  res.render('other-user-project-image');
});*/

module.exports = router;
