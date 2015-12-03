var express = require('express');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/');
  }
}

router.get('/', needAuth, function(req, res, next) {
    res.render('questionnaire/questionnaireView');
});

module.exports = router;
