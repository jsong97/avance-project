var mongoose = require('mongoose');

var projectImageSchema = new mongoose.Schema(
    {
        "filename": {type:String, required:true},
        "name": {type: String, required:true},
        "uploadDay": {type: String, required: true},
        "uploadMonth": {type: String, required: true},
        "uploadYear": {type: String, require:true},
        //"imageData": {type: Buffer, required: true},
        "imageDescription": {type: String, required:true},
        "project_id": {type: String, required: true}
    }
);

// the model is called Image
let Project_Image = module.exports = mongoose.model('project_image', projectImageSchema);
