var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  //작성자
  email: {type: String, required: true, index: true, trim: true},
  // 설문지 제목
  questionnaireName: {type: String, required: true, trim: true},
  // 설문지 내용
  questionnaireExplanation: {type: String, required: true, trim: true},
  // 질문
  question : {type: String, required: true, trim: true},
  // 질문 타입
  questionType : {type: String, required: true, trim: true},
  multiple : [String],
  andSoOn : {type: Boolean},
  // 시간
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Questionnaire = mongoose.model('Questionnaire', schema);

module.exports = Questionnaire;
