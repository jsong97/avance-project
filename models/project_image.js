var mongoose = require('mongoose');

var projectImageSchema = new mongoose.Schema(
    {
        "grid_id": {type:Number, required:true},
        "name": {type: String, required:true},
        "uploadTime": {type: String, required: true},
        //"imageData": {type: Buffer, required: true},
        "imageDescription": {type: String, required:true},
        "project_id": {type: Number, required: true}
    }
);

// the model is called Image
let Project_Image = module.exports = mongoose.model('project_image', projectImageSchema);
