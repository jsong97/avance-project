const express = require('express');
const router = express.Router();

var controller = require('../controllers/controller.js');

router.get('/login', function(req, res){
  res.render('login');
});

router.get('/register', function(req, res){
  res.render('register');
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

router.get('/:id/:id/upload', function(req, res){
  res.render('upload');
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
