/**
 * Add project comment
 * */
const passport = require('passport');
let express = require('express');
let router = express.Router();


let Comments  = require("../models/comments");


router.post('/:projectauthor/:projectId/addcomment',  ensureAuthenticated, (req, res, next) => {
  console.log(req.body);
  const author = req.body.comment_author;
  const project_id = req.body.project_id;
  const body = req.body.body;
  //const file = req.body.picture;

  req.checkBody('body', 'Comment is required').notEmpty();

  let errors = req.validationErrors();
  if (errors){
    res.render('project', {
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
        // this next part is just copy pasted res.render to replace
        // res.redirect cause I couldn't be bothered to make it work
        var redir = '/'+author+'/'+project_id;
        res.redirect(redir);
      }
    });
  }
});

// Access control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/login');
    }
}

module.exports = router;
