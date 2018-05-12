const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const path = require('path');
const multer = require('multer');
const gridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const grid = require('gridfs-stream');
const methodOverride = require('method-override');


// Bring in controller
var controller = require('../controllers/controller.js');


let User = require('../models/user');
let Project = require('../models/project');
let Image = require('../models/image');

router.get('/:imageId', (req, res) => {
    Image.findById(req.params.imageId, function (err, image) {
        gfs.files.findOne({_id: image.grid_id}, (err, file) => {
            // Check if file
            if (!file || file.length === 0) {
                return res.status(404).json({
                    err: 'No file exists'
                });
            }

            // Check if image
            //if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
            // } else {
            //    res.status(404).json({
            //        err: 'Not an image'
            //    });
            // }

        });
    });
});

// get upload page
router.get('/:username/:projectId/new/upload', ensureAuthenticated, function(req, res){
    console.log("in upload");
    Project.findById(req.params.projectId, function(err, project){
        if (err){
            console.log(err);
        } else {
            User.find({username: project.author}, function(err, user){
                if (err) {
                    console.log(err);
                }
                else {
                    res.render('upload', {
                        project: project,
                        title: 'Add Project'
                    });
                }
            });
        }
    });
});

// create storage engine
const config = require('../config/database');
const storage = new gridFsStorage({
    url: config.database,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);

                }
                console.log(file.originalname);
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'images'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({storage});
// get request omitted
router.post('/:username/:projectId/new/upload', upload.single('fileToUpload'), (req, res) => {
    if (req.file) {
        console.log("file uploaded");
    }
    let time = new Date();
    const name = req.body.name;
    const projectId = req.params.projectId;
    const imageDescription = req.body.description;
    //const imageData = fs.readFileSync(req.body.fileToUpload);
    const grid_id = req.file._id;
    const uploadTime = time.toLocaleString();

    let newImage = new Image({
        name:name,
        //projectId:projectId,
        imageDescription:imageDescription,
        //imageData:imageData,
        grid_id: grid_id,
        uploadTime:uploadTime,
        project_id: projectId
    });

    var redirFail = "/image/"+req.params.username+"/"+projectId+"/new/upload";
    var redirSuccess = req.params.username+"/"+projectId;
    newImage.save(function(err) {
        if (err) {
            console.log('image save error');
            req.flash('danger', 'Please try again');
            res.redirect(redirFail);
        }
        req.flash('success', 'File uploaded!');
        res.redirect(redirSuccess);
    });

});

// Get one image of a project
router.get('/:username/:id/:imageId', ensureAuthenticated, function(req, res){
    Image.findById(req.params.imageId, (err, image) => {

        //gfs.files.findOne({_id: image.grid_id}, (err, file) => {
        if (!image ){//| file.length === 0) {
            res.render('project-image', {image: false});

        } else {
            // in post make sure png n jpeg only -CHANGE FOR THIS
            res.render('project-image', {image: image});
        }
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