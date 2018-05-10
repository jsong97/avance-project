let mongoose = require('mongoose');

let commentSchema = new mongoose.Schema(
    {
        "projectId": {type: Number, required: true},
        "title": {type: String, required: true},
        "comments": {type: String, required: true},
    }
);

// the model is called Comment
let comments =  mongoose.model('comments', commentSchema);

module.exports = comments;
