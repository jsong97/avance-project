/**
 * Add project comment
 * */
const passport = require('passport');
let express = require('express');
let router = express.Router();


let Comments  = require("../models/comments");


router.post('/:projectauthor/:projectId/addcomment',  (req, res, next) => {
  console.log(req.body);
  const author = req.params.projectauthor;
  const project_id = req.body.project_id;
  const body = req.body.body;
  //const file = req.body.picture;

  req.checkBody('body', 'Comment is required').notEmpty();

  let errors = req.validationErrors();
  if (errors){
    res.render('home', {
      errors:errors
    });
  } else {
    let newComment = new Comments({
      project_id:project_id,
      author:author,
      body:body
    });
    newComment.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success', 'You have made a new comment');
        let pathredir = '/';
        res.redirect(pathredir);
      }
    });
  }
});

module.exports = router;
