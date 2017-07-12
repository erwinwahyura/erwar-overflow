var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require("email-validator");

var userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  username:  {
    type : String,
    required : [true, 'username is required! please fill it!'],
    unique : [true, 'username already used by another user']
  },
  password: {
    type : String,
    required : [true, 'password is required! please fill it!']
  },
  email: {
    type : String,
    required : [true, 'email is required! please fill it!']

  }
});

var user = mongoose.model('User', userSchema);

module.exports = user
