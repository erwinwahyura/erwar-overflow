const user_model = require('../models/user');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
var jwt = require('jsonwebtoken');
require('dotenv').config()

var signIn = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  user_model.findOne({ username: username }, function(err, user) {
    if(err) res.send(err);
    if(user) {
      bcrypt.compare(password, user.password)
      .then(result => {
        if(result) {
          var token = jwt.sign({id: user._id, name: user.name, email: user.email }, process.env.SECRET);
          res.send({token, name: user.name, email: user.email })
        } else {
          res.send({ msg: 'Incorrect password' });
        }
      })
      .catch(err => console.log(err))
    } else res.send({ msg: 'No such user' })
  })
}

var signUp = function(req, res, next) {
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var newUser = new user_model({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hash
  })
  newUser.save((err, user) => {
    if(err) {
      res.send(err.errors)
    } else res.send(user)
  })
}

var userInfo = function(req, res, next) {
  let token = req.headers.token
  if(token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if(!err) {
        req.body.creator = decoded.id;
        console.log('--user--', req.body.creator);
        console.log('--userinfo--->>',decoded.id);
        next()
      } else {
        res.send(err)
      }
    })
  } else {
    res.send({msg: 'Not logged in'})
  }
}

var userData = function(req, res, next) {
  let token = req.headers.token

  if(token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if(!err) {
        res.send(decoded)
      } else {
        res.send(err)
      }
    })
  } else {
    res.send({msg: 'Not logged in'})
  }
}

//userAuth for reply
var userAuth = function(req, res, next) {
  let token = req.headers.token
  console.log(token);
  if(token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      console.log('ini decode nya --->>',decoded);
      if(decoded.id == req.params.id) {
        next()
      } else {
        res.send(err)
      }
    })
  } else {
    res.send({msg: 'Not logged in'})
  }
}

module.exports = {
  signIn, signUp, userInfo, userAuth, userData
};
