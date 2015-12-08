var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  //작성자
  answer: {type: String, required: true },
  //url
  url: {type: String, required: true },
  // 시간
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var QuestionnaireAnswer = mongoose.model('QuestionnaireAnswer', schema);

module.exports = QuestionnaireAnswer;
