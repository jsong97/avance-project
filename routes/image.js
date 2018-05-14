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
const moment = require('moment');

// Bring in controller
var controller = require('../controllers/controller.js');


let User = require('../models/user');
let Project = require('../models/project');
let Image = require('../models/image');
let Project_Image = require('../models/project_image');



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
    //res.json({file: req.file}); return;
    if (req.file) {
        console.log("file uploaded");
        console.log(req.file.id);
    }
    let time = new Date();
    const name = req.body.name;
    const projectId = req.params.projectId;
    const imageDescription = req.body.description;
    //const imageData = fs.readFileSync(req.body.fileToUpload);
    var hasFile = 0;
    var filename = "NOFILE";
    if (req.file !== undefined){
      filename = req.file.filename;
      hasFile = 1;
    }
    console.log("filename is: \n");
    console.log(filename);
    console.log(hasFile);
    const uploadTime = time.toLocaleString();
    let readableTime = moment(uploadTime);
    let uploadDay = readableTime.format('DD');
    let uploadMonth = readableTime.format('MMMM');

    let newImage = new Project_Image({
      name:name,
      //projectId:projectId,
      imageDescription:imageDescription,
      //imageData:imageData,
      filename:filename,
      uploadDay:uploadDay,
      uploadMonth:uploadMonth,
      project_id:projectId
    });

    var redirFail = "/image/"+req.params.username+"/"+projectId+"/new/upload";
    var redirSuccess = "/"+req.params.username+"/"+projectId;
    newImage.save(function(err) {
        if (err) {
            console.log(err);
            req.flash('danger', 'Please try again');
            res.redirect(redirFail);
        }
        else {
            req.flash('success', 'File uploaded!');
            res.redirect(redirSuccess);
        }
    });
});

// Get one image of a project
router.get('/:id/:imageId', ensureAuthenticated, function(req, res){
    Project_Image.findById(req.params.imageId, (err, image) => {
        if (err) {
            console.log(err);
        }
        //gfs.files.findOne({_id: image.grid_id}, (err, file) => {
        //if (!image ){//| file.length === 0) {
        //    res.render('project-image', {image: false});

        //}
        else {
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
