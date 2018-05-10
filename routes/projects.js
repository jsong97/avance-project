const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in controller
var controller = require('../controllers/controller.js');


let Project = require('../models/project');
let User = require('../models/user');
let Image = require('../models/image');
let Comments = require('../models/comment');
// get the dashboard
router.get('/', ensureAuthenticated, function(req, res){
  // res.render('myprojects');
  Project.find({}, function(err, projects){
    if(err){
      console.log(err);
    } else{
      res.render('sampledashboard', {
        title: 'My Projects',
        projects: projects
      });
    }
  });
});


// add a project
router.get('/newproject', ensureAuthenticated, function(req, res){
  var id = req.params.id;
  res.render('newproject', {
    title: "New Project",
    userID: id
  });
});

router.post('/newproject', controller.createProject);

// Get single project
router.get('/:id', function(req, res){
  Project.findById(req.params.id, function(err, project){
    User.findById(project.author, function(err, user){
      res.render('project', {
        project: project,
        author: user.name,
      });
    });
    return;
  });
});

// find one project
// router.get('/:id', ensureAuthenticated, function(req, res){
//   Project.findById(req.params.id, function(err, project){
//     User.findById(project.author, function(err, user){
//       res.render('project', {
//         project: project,
//         author: user.name
//       });
//     });
//   });
// });




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
