const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.render('explore');
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
