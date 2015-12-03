/*Router
A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,”
capable only of performing middleware and routing functions. Every Express application has a built-in app router.
A router behaves like middleware itself, so you can use it as an argument to app.use() or as the argument to another router’s use() method.
The top-level express object has a Router() function that creates a new router object.

Router([options])
Create a new router as follows:

var router = express.Router([options]);*/

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
/*
router.get('/questionnaire', function(req, res, next) {
  res.render('questionnaire/questionnaireView');
});*/


module.exports = router;
