const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in controller
var controller = require('../controllers/controller.js');


let Project = require('../models/project');

// add a project
router.get('/', function(req, res){
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
router.get('/newproject', function(req, res){
  var id = req.params.id;
  res.render('newproject', {
    title: "New Project",
    userID: id
  });
});

router.post('/newproject', controller.createProject);

module.exports = router;
