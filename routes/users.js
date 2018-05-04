const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const router = express.Router();
const config = require('../config/database');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');

var controller = require('../controllers/controller.js');

router.get('/login', function(req, res){
  res.render('login');
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

// // actual backend:
// router.get('/:id', function(req, res){
//   res.send(users[req.params.id]);
// })
//


module.exports = router;
