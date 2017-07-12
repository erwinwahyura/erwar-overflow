var express = require('express')
var router = express.Router()

var userController = require('../controllers/user_controller.js')
var auth = require('../controllers/auth.js')

//auth
router.post('/signup', auth.signUp) //done register
router.post('/signin', auth.signIn) //done login

router.get('/', userController.getAlluser) //done get user
router.get('/:_id', userController.getUserById) //done
router.put('/:_id', userController.update_user) //done edit user hash password
router.delete('/:_id', userController.delete_user) //done

module.exports = router
