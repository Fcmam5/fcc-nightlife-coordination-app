var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
                        title: 'FreeCodeCamp Coordination',
                        user: req.user
                      });
});

/* GET Login page. */
router.get('/login', function (req, res) {
  return res.render('user/login', {title: "Login page", message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
        failureFlash : true // allow flash messages
}));

router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
});

/*
* Handle Signup routes
* */
router.get('/signup', function (req, res) {
  return res.render('user/signup', {title: "Signup page", message: req.flash('signupMessage')});
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true // allow flash messages
}));

/*
* Facebook authentication
* */
router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/',
        failureRedirect : '/'
}));

// Facebook Authorize
router.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

router.get('/connect/facebook/callback',
    passport.authorize('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

/*
* Twitter authentication
* */
router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect : '/',
        failureRedirect : '/'
}));

// Twitter Authorize
router.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

// handle the callback after twitter has authorized the user
router.get('/connect/twitter/callback',
    passport.authorize('twitter', {
        successRedirect : '/',
        failureRedirect : '/'
}));

/*
* Unlinking accounts
* */

// Local
router.get('/unlink/local', function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/users/profile');
		});
});

// Facebook
router.get('/unlink/facebook', function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/users/profile');
		});
});

// Twitter
router.get('/unlink/twitter', function(req, res) {
		var user           = req.user;
		user.twitter.token = undefined;
		user.save(function(err) {
			res.redirect('/users/profile');
		});
});


module.exports = router;
