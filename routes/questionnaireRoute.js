var express = require('express'),
User = require('../models/User'),
Questionnaire = require('../models/Questionnaire'),
QuestionnaireAnswer = require('../models/QuestionnaireAnswer');
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

//questionnaireList
router.get('/list',needAuth ,function(req, res, next) {
  var email = req.user.name;
  Questionnaire.find({'email': email}, function(err, questionnaires) {
    if (err) {
      return next(err);
    }
    res.render('questionnaire/questionnaireList', {questionnaires: questionnaires});
  });
});

router.get('/:id/result',needAuth ,function(req, res, next) {
  var email = req.user.name;
  var url = req.url.split('/');
  var url2 = url[1].split('/');

  Questionnaire.findById(url2, function(err, questionnaire){
    QuestionnaireAnswer.count({'url':url2},function(err, count){
      QuestionnaireAnswer.find({'url':url2}, function(err, questionnaireAnswers) {
        if (err) {
          return next(err);
        }
        res.render('questionnaire/QuestionnaireResult', {questionnaireAnswers: questionnaireAnswers, count:count, questionnaire:questionnaire});
      });
    });
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
  console.log(req.body.andSoOn);

  var questionnaire = new Questionnaire({
    email: req.user.name,
    questionnaireName: req.body.questionnaireName,
    questionnaireExplanation: req.body.questionnaireExplanation,
    question: req.body.question,
    questionType: req.body.questionType,
    multiple: req.body.option,
    andSoOn: req.body.andSoOn
  });
  questionnaire.save(function(err, doc) {
      if (err) {
        return next(err);
      }
      //doc.id가 url
      req.flash('success','설문지 작성 완료');
      res.redirect('/');
    });
});


//설문지 show
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
router.post('/:id', function(req, res, next) {
  // validateForm 함수 호출,값이 정상적으로 입력되면 validateForm에서 null return

  var err = validateAnswerForm(req.body);
  if (err) {
    req.flash('danger', err);
    return res.redirect('back');
  }

  var url = req.url.split('/');
  var questionnaireAnswer = new QuestionnaireAnswer({
    answer: req.body.answer,
    url: url[1]
  });
  questionnaireAnswer.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success','설문 작성완료');
      res.redirect('/');
  });
});

router.get('/:id/edit', function(req, res, next) {
  Questionnaire.findById(req.params.id, function(err, questionnaire) {
    if (err) {
      return next(err);
    }
    res.render('questionnaire/questionnaireEdit', {questionnaire: questionnaire});
  });
});

router.put('/:id', function(req, res, next) {
  var err = validateForm(req.body);
  if (err) {
    req.flash('danger', err);
    return res.redirect('back');
  }
  Questionnaire.findById(req.params.id, function(err, questionnaire) {
    if (err) {
      return next(err);
    }
    else {
      questionnaire.questionnaireName = req.body.questionnaireName;
      questionnaire.questionnaireExplanation = req.body.questionnaireExplanation;
      questionnaire.question = req.body.question;
      questionnaire.questionType =  req.body.questionType;
      questionnaire.save(function(err) {
        if (err) {
          return next(err);
        }
        req.flash('success', '설문지 수정 완료');
        res.redirect('/');
      });
    }
  });
});


// delete questionnaire
router.delete('/:id', function(req, res, next) {
  Questionnaire.findOneAndRemove({'_id': req.params.id}, function(err) {
    QuestionnaireAnswer.remove({'url': req.params.id}, function(err){
      if(err){
        return next(err);
      }
    });
    if (err) {
      return next(err);
    }
    else{
      req.flash('success', '설문이 삭제되었습니다.');
      res.redirect('/');
    }
  });
});


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

function validateAnswerForm(form) {
  var answer = form.answer || "";

  if (!answer) {
    return '답변을 입력해주세요.';
  }
  return null;
}


module.exports = router;
