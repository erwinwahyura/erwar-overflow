var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')

// mongodb://<dbuser>:<dbpassword>@ds157112.mlab.com:57112/erwar-overflow
mongoose.connect('mongodb://erwinwahyura:erwinwahyura@ds157112.mlab.com:57112/erwar-overflow');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connection success!!!');
});

var index = require('./routes/index');
var user = require('./routes/user');
var question = require('./routes/question');

var app = express();
app.use(cors())

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api/users', user);
app.use('/api/questions', question);

app.listen(3000)

module.exports = app;
