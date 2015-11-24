var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('mainView');
});

router.get('/signInView', function(req, res, next) {
  res.render('users/signInView');
});

router.get('/signUpView', function(req, res, next) {
  res.render('users/signUpView');
});


module.exports = router;
