var express = require('express');
var router = express.Router();

var controller = require('../controllers/controller.js');

// Create users
router.post('/api', controller.createUser);

// Find all users
router.get('/api', controller.findAllUsers);

// Find one user
router.get('/api/:id/:id', controller.findOneUser);

router.post('/api/:id', controller.createProject);

router.post('/api/:id/:id', controller.uploadImage);

module.exports = router;
