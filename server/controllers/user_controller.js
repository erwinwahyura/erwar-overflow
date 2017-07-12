var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
const user_model = require('../models/user.js')
var bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);


var methods = {}

var getAlluser = function(req, res, next) {
  user_model.find({}, function(err, result) {
    if(!err) res.send(result)
    else console.log(err);
  })
}
//method deleteOne can also use remove, deleteOne with promise .then / callback and deleteMany
var delete_user = function(req, res, next) {
  user_model.deleteOne({_id:req.params._id}, function(err, result) {
    if(!err) res.send(result)
    else res.send(err)
  })
}

var getUserById = function(req, res ) {
  let id = req.params._id
  user_model.findById({_id:id}, function(err, result) {
    if(!err) res.send(result)
    else res.send(err)
  })
}

//trying using findOneandDelete
//docs : http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate

var update_user = function(req, res, next) {
  if (req.body.password == null) {
    let id = req.params._id
    user_model.findById({_id:id}, function(err, result) {
      user_model.findOneAndUpdate({_id:id}, {$set : {name: req.body.name || result.name, username: req.body.username || result.username, password: hash || result.password, email: req.body.email || result.email}}, function(err, resultLast) {
        if(!err) res.send("update successful\n"+ resultLast)
        else res.send(err.message)
      })
    })
  } else {
    var hash = bcrypt.hashSync(req.body.password, salt);
    let id = req.params._id
    user_model.findById({_id:id}, function(err, result) {
      user_model.findOneAndUpdate({_id:id}, {$set : {name: req.body.name || result.name, username: req.body.username || result.username, password: hash || result.password, email: req.body.email || result.email}}, function(err, resultLast) {
        if(!err) res.send("update successful\n"+ resultLast)
        else res.send(err.message)
      })
    })
  }

}

module.exports = {
  getAlluser,
  delete_user,
  update_user,
  getUserById
}
