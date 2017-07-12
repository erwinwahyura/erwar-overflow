var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  title:  {
    type : String,
    required : [true, 'username is required! please fill it!'],
    unique : [true, 'username already used by another user']
  },
  body: {
    type : String,
    required : [true, 'password is required! please fill it!']
  },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer' }],
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: Date,
  updatedAt: Date
});

var question = mongoose.model('Question', questionSchema);

module.exports = question
