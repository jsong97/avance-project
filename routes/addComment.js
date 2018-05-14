/**
 * Add project comment
 * *//**
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
<<<<<<< HEAD
        projectId: projectID,
        title:titleText,
        comments:commentText,
    });

    comment.save();
    res.end("Comment Post successfully");
});

=======
            projectId: projectID,
            title:titleText,
            comments:commentText,
        });

    comment.save();
    res.end("Comment Post successfully");
});

>>>>>>> parent of 9027dfb... Comment part
module.exports = router;