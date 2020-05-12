var express = require('express');
var router = express.Router();
var deviceController = require('../app/controllers/deviceController');
var passport = require('passport');

router.get('/', passport.authenticate('bearer', { session: false }), deviceController.fetchAll);
router.delete('/:id', passport.authenticate('bearer', { session: false }), deviceController.deleteData);
router.post('/', passport.authenticate('bearer', { session: false }), deviceController.addData);
router.get('/:id/data', passport.authenticate('bearer', { session: false }), deviceController.fetchDeviceData);
router.get('/:id', passport.authenticate('bearer', { session: false }), deviceController.fetchData);

module.exports = router;
