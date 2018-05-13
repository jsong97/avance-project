/**
 * Add project comment
 * */
const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
let router = express.Router();
let Comment  = require("../models/comment");
// Bring in controller
var controller = require('../controllers/controller.js');

// get the comment
router.get('/', ensureAuthenticated, function(req, res){;
    Comment.find({}, function(err, addComment){
        if(err){
            console.log(err);
        } else{
            res.render('project', {
                projectId: projectID,
                title:titleText,
                comments:commentText,
            });
        }
    });
});


// add comment
router.get('/project', ensureAuthenticated, function(req, res){
    var id = req.params.id;
    res.render('project', {
        projectId: projectID,
        title:titleText,
        comments:commentText,
    });
});

router.post('/project', controller.UploadComment);

// Get comments
router.get('/:id', function(req, res){
    Comment.findById(req.params.id, function(err, addcomment){
        Project.findById(project.author, function(err, project){
            res.render('project', {
                projectId: projectID,
                title:titleText,
                comments:commentText,
            });
        });
        return;
    });
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
