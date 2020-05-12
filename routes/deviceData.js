var express = require('express');
var router = express.Router();
var deviceDataController = require('../app/controllers/deviceDataController');
var passport = require('passport');

router.get('/', passport.authenticate('bearer', { session: false }), deviceDataController.ownsDevice, deviceDataController.fetchAll);
router.delete('/:id', passport.authenticate('bearer', { session: false }), deviceDataController.deleteData);
router.post('/', passport.authenticate('bearer', { session: false }), deviceDataController.addData);
router.get('/:id', passport.authenticate('bearer', { session: false }), deviceDataController.ownsDevice,deviceDataController.fetchUser);

module.exports = router;
