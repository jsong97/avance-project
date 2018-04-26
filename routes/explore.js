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
});

module.exports = router;
