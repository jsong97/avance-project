var mongoose = require('mongoose');
//var multer = require('multer');
var fs = require('fs');

// this is the 'User' model
var User = mongoose.model('User');

// this is the 'Project' model
var Project = mongoose.model('Project');

//var Image = mongoose.model('Image');


const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('connect-flash');

const fetchHome = (req, res) => {
  res.render("home");
};

// Registration and making new users
var createUser = function(req, res){
  console.log(req.body);
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();

  let errors = req.validationErrors();

  if (errors){
    res.render('register', {
      errors:errors
    });
  } else {
    let newUser = new User({
      name:name,
      username: username,
      password: password,
      email: email
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success', 'You are now registered and log in');
            res.redirect('/login');
          }
        });
      });
    });
  }
}


// Find all the Users
var findAllUsers = function(req, res){
  User.find(function(err, users){
    if(!err){
      res.send(users);
    } else {
      res.sendStatus(404);
    }
  });
}

var findOneUser = function(req, res){
  var userInx = req.params.id;
  User.findById(userInx, function(err, user){
    if(!err){
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  });
}

var createProject = function(req, res){
  console.log(req.body);
  const name = req.body.name;

  User.find({username: req.params.username}, (err, user) => {
    console.log("in controller create proj");
    console.log(user);
    if (err) {
      return;
    }
    const author = user._id;
    const description = req.body.description;
    //const file = req.body.picture;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();

    let errors = req.validationErrors();
    if (errors){
      res.render('newproject', {
        errors:errors
      });
    } else {
      let newProject = new Project({
        name:name,
        author:author,
        description:description
      });
      newProject.save(function(err){
        if(err){
          console.log(err);
          return;
        } else {
          req.flash('success', 'You have made a new project');
          res.redirect('/');
        }
      });
    }
  });
}

var uploadImage = function(req, res) {
  let time = new Date();
  const name = req.body.name;
  //const projectId = req.params.id; //project id
  const imageDescription = req.body.description;
  const imageData = fs.readFileSync(req.body.fileToUpload); //change to path
  const uploadTime = time.toLocaleString();

  let newImage = new Image({
    name:name,
    //projectId:projectId,
    imageDescription:imageDescription,
    imageData:imageData,
    uploadTime:uploadTime
    });


  newImage.save(function(err) {
    if (err) {
      res.flash("Something went wrong!");
    }
    res.end("File uploaded sucessfully!.");
  });


}

module.exports = {
  fetchHome,
  createUser,
  findAllUsers,
  findOneUser,
  createProject,
  uploadImage
};
