const express = require('express');
const router = express.Router();

router.get('/login', function(req, res){
  res.render('login');
});

router.get('/register', function(req, res){
  res.render('register');
});

router.get('/:id/myprojects', function(req, res){
  res.render('myprojects');
});

router.get('/:id/myprojects/:id', function(req, res){
  res.render('project');
});

router.get('/:id/myprojects/:id/upload', function(req, res){
  res.render('upload');
});

router.get('/:id/myprojects/:id/:id', function(req, res){
  res.render('project-image');
});


module.exports = router;
