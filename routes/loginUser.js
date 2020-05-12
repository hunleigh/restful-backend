var express = require('express');
var router = express.Router();
var users = require('../app/controllers/userController');
var passport = require('passport');

//routes
router.post('/login', passport.authenticate('local'), users.login);

module.exports = router;
