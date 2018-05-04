var mongoose = require('mongoose');
var User = mongoose.model('users');

const fetchHome = (req, res) => {
  res.render("home");
};

// Registration and making new users
var createUser = function(req, res){
  console.log(req.body);
  var user = new User({
    "name":req.body.name,
    "username":req.body.username,
    "password":req.body.password,
    "email":req.body.email
  });
  user.save(function(err, newUser){
    if(!err){
      res.send(newUser);
      res.redirect('/');
    }else {
      res.sendStatus(400);
    }
  });
}


// Find all the Users
var findAllUsers = function(req, res){
  User.find(function(err, users){
    if(!err){
      res.send(users);
    } else {
      res.sendStatus(404);
    }
  })
};

var findOneUser = function(req, res){
  var userInx = req.params.id;
  User.findById(userInx, function(err, user){
    if(!err){
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  });
};

module.exports = {
  fetchHome,
  createUser,
  findAllUsers,
  findOneUser
};
