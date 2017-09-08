var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController.js');
var PlaceController = require('../controllers/PlaceController.js');

/*
 * GET
 */
router.get('/', PlaceController.list);
router.get('/search', PlaceController.search);
router.get('/:id', PlaceController.show);
router.post('/', PlaceController.create);


module.exports = router;
