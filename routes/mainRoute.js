var express = require('express'),
    User = require('../models/User');
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

router.get('/questionaires', function(req, res, next) {
  res.render('questionaires/questionaireView');
});


module.exports = router;
