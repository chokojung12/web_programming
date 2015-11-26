var express = require('express');
var router = express.Router();

router.get('/edit', function(req, res, next) {
  res.render('users/userEditView');
});
router.get('/list', function(req, res, next) {
  res.render('users/userListView');
});
module.exports = router;
