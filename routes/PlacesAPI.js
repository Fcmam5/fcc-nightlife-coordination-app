var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController.js');
var PlaceController = require('../controllers/PlaceController.js');
var helper = require('./helperFunctions');

/*
 * GET
 */
router.get('/', PlaceController.list);
router.get('/search', PlaceController.search);
router.get('/search/goto/:id', helper.isLoggedIn, PlaceController.goToPlace);
router.get('/:id', PlaceController.show);


module.exports = router;
