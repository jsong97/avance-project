const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.render('stories');
});

router.get('/:id', function(req, res){
  res.render('story');
});


module.exports = router;
