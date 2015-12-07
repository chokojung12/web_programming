var express = require('express'),
User = require('../models/User'),
Questionnaire = require('../models/Questionnaire');
var router = express.Router();

//설문지 작성 페이지
router.get('/new',needAuth ,function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    }
    res.render('questionnaire/questionnaireEdit',{questionnaire: {}});
  });
});

//설문지 작성
router.post('/', function(req, res, next) {
  // validateForm 함수 호출,값이 정상적으로 입력되면 validateForm에서 null return
  var err = validateForm(req.body);
  if (err) {
    req.flash('danger', err);
    return res.redirect('back');
  }

  var questionnaire = new Questionnaire({
    email: req.user.name,
    questionnaireName: req.body.questionnaireName,
    questionnaireExplanation: req.body.questionnaireExplanation,
    question: req.body.question,
    questionType: req.body.questionType
  });
  questionnaire.save(function(err, doc) {
      if (err) {
        return next(err);
      }
      //doc.id가 url
      res.redirect('/questionnaire/' + doc.id);
    });
});


//설문지 작성완료
router.get('/:id', function(req, res, next) {
  Questionnaire.findById(req.params.id, function(err, questionnaire) {
    if (err) {
      return next(err);
    }
    res.render('questionnaire/questionnaireshow', {questionnaire: questionnaire});

    return next(new Error('not found'));
  });
});

//설문작성
router.post('/result', function(req, res, next) {
  // validateForm 함수 호출,값이 정상적으로 입력되면 validateForm에서 null return
  req.flash('success','설문 작성완료');
  res.redirect('/');
});

/*
//
router.put('/:id', function(req, res, next) {
  Questionnaire.findById(req.params.id, function(err, questionnaire) {
    if (err) {
      return next(err);
    }

    if (req.body.password === post.password) {
      post.email = req.body.email;
      post.title = req.body.title;
      post.content = req.body.content;
      post.save(function(err) {
        res.redirect('/posts/' + req.params.id);
      });
    }
    res.redirect('/');
  });
});

//
router.get('/:id/edit', function(req, res, next) {
  Questionnaire.findById(req.params.id, function(err, questionnaire) {
    if (err) {
      return next(err);
    }
    res.render('questionnaire/questionnaireEdit', {questionnaire: questionnaire});
  });
});*/



function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/');
  }
}

function validateForm(form) {
  var questionnaireName = form.questionnaireName || "";
  var questionnaireExplanation = form.questionnaireExplanation || "";
  var question = form.question || "";
  var questionType = form.questionType || "";

  if (!questionnaireName) {
    return '설문지 제목을 입력해주세요.';
  }

  if (!questionnaireExplanation) {
    return '설문지 설명을 입력해주세요.';
  }

  if (!question) {
    return '질문 제목을 입력해주세요.';
  }

  if (questionType === 'select') {
    return '질문 유형을 선택해주세요.';
  }

  return null;
}


module.exports = router;
