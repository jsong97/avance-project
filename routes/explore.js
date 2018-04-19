const express = require('express');
const router = express.Router();

router.get('/forum', function(req, res){
  res.render('forum');
});

router.get('/mission', function(req, res){
  res.render('mission');
});

router.get('/support', function(req, res){
  res.render('support');
});

router.get('/team', function(req, res){
  res.render('team');
});

router.get('/:id', function(req, res){
  res.render('other-user');
});

router.get('/:id/:id', function(req, res){
  res.render('other-user-project');
});

router.get('/:id/:id/:id', function(req, res){
  res.render('other-user-project-image');
});

module.exports = router;
