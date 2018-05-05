const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in controller
var controller = require('../controllers/controller.js');


let User = require('../models/user');

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
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// register route
router.get('/register', function(req, res){
  res.render('register', {
    title:'Register User'
  });
});

// still need to create a strategy
router.post('/register', controller.createUser);

// after login
router.get('/:id', function(req, res){
  res.render('myprojects');
});

router.get('/:id/:id', function(req, res){
  res.render('project');
});

// add Project
router.get('/:id/:id/upload', function(req, res){
  res.render('upload', {
    title: 'Add Project'
  });
});


router.post('/:id/:id/upload', function(req, res){
  console.log('Submitted Project')
});

router.get('/:id/:id/:id', function(req, res){
  res.render('project-image');
});



module.exports = router;
