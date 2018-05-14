let mongoose = require('mongoose');

let commentSchema = new mongoose.Schema(
  {
        "project_id": {type: String, required: true},
        "body": {type: String, required: true},
        "author": {type: String, required: true}
    }
);

// the model is called Image
let Comments = module.exports = mongoose.model('Comments', commentSchema);
