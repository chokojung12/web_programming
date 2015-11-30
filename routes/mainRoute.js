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

router.get('/questionaires', function(req, res, next) {
  res.render('questionaires/questionaireView');
});

router.post('/signInView', function(req, res, next) {
  res.redirect('/');     // /todos 경로를 내가 /로 수정함
});

router.post('/signUpView', function(req, res, next) {
  res.redirect('/');     // /todos 경로를 내가 /로 수정함
});

module.exports = router;
