/**
 * Add project comment
 * */
const passport = require('passport');
let express = require('express');
let router = express.Router();
let Comment  = require("../models/comment");
router.post('/',  (req, res, next) => {

    let projectID = req.body.pid;
    let titleText = req.body.title;
    let commentText = req.body.comment;

    console.log(req.session);
    let comment = new Comment({
            projectId: projectID,
            title:titleText,
            comments:commentText,
        });

    comment.save();
    res.end("Comment Post successfully");
});

module.exports = router;