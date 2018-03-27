const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/", controller.fetchHome);

//router.get("/users", controller.fetchUsers);
//
//
//router.get("/users/:id", controller.fetchUserById);

module.exports = router;