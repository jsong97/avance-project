// const users = require("../models/db");

const fetchHome = (req, res) => {
  res.render("home");
};

//const fetchUsers = (req, res) => {
//  // res.send(users);
//  res.render("users", {users});
//};


//const fetchUserById = (req, res) => {
//  const id = req.params.id;
//  if (users[id]) {
//    res.render("user_template", {person: users[id]});
//  } else {
//    console.log(`Tried to get /users/${id}`);
//    res.redirect("/users");
//  }
//};

module.exports = {
  fetchHome
//  fetchUsers,
//  fetchUserById
};