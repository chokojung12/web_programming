//app.METHOD(path, callback [, callback ...])

module.exports = function(app, passport) {
  app.post('/signInView', passport.authenticate('local-signin', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/signInView', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));


  app.get('/signOut', function(req, res) {
    req.logout();
    req.flash('success', '로그아웃 되었습니다.');
    res.redirect('/');
  });
};
