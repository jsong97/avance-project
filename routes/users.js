const express = require('express');
const router = express.Router();

router.get('/login', function(req, res){
  res.render('login');
});

router.get('/register', function(req, res){
  res.render('register');
});

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


module.exports = router;
