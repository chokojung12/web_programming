var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  writer: {type: String},
  title: {type: String},
  contents: {type: String},
  writerPassword : {type: String},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Posts = mongoose.model('Posts', schema);

module.exports = Posts;
