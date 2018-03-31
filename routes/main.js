const express = require("express");
const router = express.Router();

router.get("/", function(req, res){
  res.render('home');
});

//router.get("/users", controller.fetchUsers);
//
//
//router.get("/users/:id", controller.fetchUserById);

module.exports = router;
