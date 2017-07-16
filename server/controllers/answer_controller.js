var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
const answer_model = require('../models/answer.js')
const question_model = require('../models/question.js')

//cara 1, save is more faster than .create
var add_answer = function(req, res, next){
    var answer = new answer_model({
      answerBody:req.body.answerBody,
      parent: req.params._id,
      creator: req.body.creator,
      upvotes: [],
      downvotes: [],
      createdAt: new Date(),
      updatedAt: new Date()
    })
    answer.save(function(err,result){
      if(err) {
        res.send(err)
      } else {
        console.log('this is result', result);
        let id = req.params._id
        console.log('id--------',id);
        question_model.findById({_id:id}, function(err, data) {
          console.log('this is data', data);
          data.answers.push(result)
          data.save((err, data_update) => {
            if(!err) res.send(data_update)
            else res.send(err)
          })
        })
      }
    })
}

var getAllanswer = function(req, res, next) {
  answer_model.find({})
    .populate('creator')
    .populate({path: 'name', select: 'name'})
    .exec(function(err, result) {
      if(!err) res.send(result)
      else console.log(err);
    })
}

var getAnswerByParent = function(req, res) {
  let id = req.params._id
  answer_model.findById({_id:id}, function(err, result) {
    if(!err) res.send(result)
    else console.log(err);
  })
}

var getAnswerById = function(req, res) {
  let id = req.params._id
  answer_model.findById({_id:id}, function(err, result) {
    if(!err) res.send(result)
    else console.log(err);
  })
}
//method deleteOne can also use remove, deleteOne with promise .then / callback and deleteMany
var delete_answer = function(req, res, next) {
  answer_model.deleteOne({_id:req.params.id}, function(err, result) {
    if(!err) res.send("success deleted")
    else res.send(err)
  })
}

//trying using findOneandDelete
//docs : http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate

var update_answer = function(req, res, next) {
  let id = req.params._id
  answer_model.findById({_id:id}, function(err, result) {
    answer_model.findOneAndUpdate({_id:id}, {$set : {answerBody: req.body.answerBody || result.answerBody, updatedAt: new Date()}}, function(err, result) {
      if(!err) res.send("update successful\n"+ result)
      else res.send(err.message)
    })
  })
}

var upvote = function(req, res) {
  console.log('hi ini upvote');
  let id = req.params._id
  console.log('hi ini id ',id);
  answer_model.findById({_id:id}, function(err, result) {
    console.log('ini resultnya --> : ',result);
    console.log('1---',result.creator);
    console.log('2---',req.body.creator);
    if (result._id && req.body.creator) {
      console.log('masuk');
      var index_up = result.upvotes.indexOf(req.body.creator)
      var index_down = result.downvotes.indexOf(req.body.creator)
      if (index_up == -1 && index_down == -1) {
        result.upvotes.push(req.body.creator)
      } else if (index_down !== -1) {
        result.downvotes.splice(index_down, 1)
      }
      result.save(function(err, updated_result) {
        if (!err) res.send(updated_result)
        else res.send(err)
      })
    }
  })
}

var downvote = function(req, res) {
  let id = req.params._id
  console.log(id);
  answer_model.findById(req.params._id, function(err, result) {
    console.log(result);
    if (req.body.creator) {
      console.log('-===========================-7');
      console.log('ini id yg mau vote : ', req.body.creator);
      var index_up = result.upvotes.indexOf(req.body.creator)
      console.log('cek index up ', index_up);
      var index_down = result.downvotes.indexOf(req.body.creator)
      console.log('cek index down ', index_down);
      if (index_up == -1 && index_down == -1) {
        result.downvotes.push(req.body.creator)
        console.log(result.downvotes);
      } else if (index_up !== -1) {
        result.upvotes.splice(index_down, 1)
        console.log(result.upvotes);
      }
      result.save(function(err, updated_result) {
        if (!err) res.send(updated_result)
        else res.send(err)
      })
    }
  })
}

module.exports = {
  downvote,
  upvote,
  update_answer,
  delete_answer,
  getAllanswer,
  add_answer,
  getAnswerById,
  getAnswerByParent
}
