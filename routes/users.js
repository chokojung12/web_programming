// create express, like include <express>
var express = require('express'),
User = require('../models/User'),
bcrypt = require('bcryptjs');
var router = express.Router();

//get url 접근 후 function 실행 약속, req, res, next => /edit의 결과 객체를 받고 항상 function 실행

/* GET users listing. */
router.get('/list', function(req, res, next) {
  if(req.user === undefined){
    req.flash('danger','운영자만 접근 가능합니다.');
    res.redirect('/');
  }
  else if(req.user.name === 'admin'){
    User.find({}, function(err, users) {
      if (err) {
        res.redirect('/');
      }
      res.render('users/userListView', {users: users});
    });
  }
  else{
    req.flash('danger','운영자만 접근 가능합니다.');
    res.redirect('/');
  }
});

// user profile view
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    }
    res.render('users/profileView', {user: user});
  });
});

//user edit view
router.get('/:id/edit', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    }
    res.render('users/userEditView', {user: user});
  });
});

//user edit
router.put('/:id', function(req, res, next) {
  var err = validateForm(req.body);
  if (err) {
    req.flash('danger', err);
    return res.redirect('back');
  }

  User.findById({_id: req.params.id}, function(err, user) {
    var pwd = user.validatePassword(user.password);
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('danger', '존재하지 않는 사용자입니다.');
      return res.redirect('back');
    }

    // DB에서 암호화된 암호를 복호화 시켜야하는데 안되는 문제점 해결
    if(!(bcrypt.compareSync(req.body.current_password, user.password))) {
      req.flash('danger', '현재 비밀번호가 일치하지 않습니다.');
      return res.redirect('back');
    }

    user.name = req.body.name;
    user.email = req.body.email;
    if (req.body.password) {
      user.password = user.generateHash(req.body.password);
    }

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', '사용자 정보가 변경되었습니다.');
      res.redirect('/');
    });
  });
});

//user sign up
router.post('/new', function(req, res, next) {
  // validateForm 함수 호출,값이 정상적으로 입력되면 validateForm에서 null return
  var err = validateForm(req.body, {needPassword: true});
  if (err) {
    req.flash('danger', err);
    return res.redirect('back');
  }
  // db access
  // {} 객체를 의미함, : is assignment
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      req.flash('danger', '동일한 이메일 주소가 이미 존재합니다.');
      return res.redirect('back');
    }
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
    });
    //여기서 비밀번호는 암호화
    newUser.password = newUser.generateHash(req.body.password);

    // newUser를 db에 insert
    newUser.save(function(err) {
      if (err) {
        next(err);
      } else {
        req.flash('success', '가입이 완료되었습니다. 로그인 해주세요.');
        res.redirect('/');
      }
    });
  });
});

// delete user
router.delete('/:id', function(req, res, next) {
  User.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    if(req.body.name === "admin"){
      req.flash('success', '사용자 계정이 삭제되었습니다.');
      res.redirect('/users/list');
    }
    else{
      req.flash('success', '사용자 계정이 삭제되었습니다.');
      res.redirect('/');
    }
  });
});


function validateForm(form, options) {
  var name = form.name || "";
  var email = form.email || "";
  name = name.trim(); //trim 공백과 탭을 제거
  email = email.trim();

  if (!name) {
    return '이름을 입력해주세요.';
  }

  if (!email) {
    return '이메일을 입력해주세요.';
  }

  if (!form.password && options.needPassword) {
    return '비밀번호를 입력해주세요.';
  }

  if (form.password !== form.password_confirmation) {
    return '비밀번호가 일치하지 않습니다.';
  }

  if (form.password.length < 6) {
    return '비밀번호는 6글자 이상이어야 합니다.';
  }

  return null;
}


module.exports = router;
