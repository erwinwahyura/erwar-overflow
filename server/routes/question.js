var express = require('express')
var router = express.Router()

var answerController = require('../controllers/answer_controller.js')
var questionController = require('../controllers/question_controller.js')
var auth = require('../controllers/auth.js')

router.post('/', auth.userInfo, questionController.add_question)  //done post question
router.get('/',  questionController.getAllquestion) //done get all question
router.get('/:_id', questionController.getQeustionById)//done get 1 question

//question voting
router.put('/:_id/upvote', auth.userInfo, questionController.upvote) //done question up
router.put('/:_id/downvote', auth.userInfo, questionController.downvote) //done questions down

router.delete('/:_id', auth.userInfo, questionController.delete_question) //done
router.put('/:_id', auth.userInfo, questionController.update_question) //done

// -------------------------------------------------
router.get('/:_id/answer', auth.userInfo, answerController.getAllanswer)  //done get answers
router.get('/:_id/answer/:_id', auth.userInfo, answerController.getAnswerByParent)  //done get answers
router.post('/:_id/answer', auth.userInfo, answerController.add_answer)  //done post answers

router.get('/:_id/answer/:_id', answerController.getAnswerById)// id

//answer voting
router.put('/:_id/answer/:_id/upvote', auth.userInfo, answerController.upvote) //done answer up
router.put('/:_id/answer/:_id/downvote', auth.userInfo, answerController.downvote) //done answers down
//
router.delete('/:_id/answers/:_id', auth.userInfo, answerController.delete_answer) //done






module.exports = router
