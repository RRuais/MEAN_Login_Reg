var express = require('express');
var port = 8000;
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Static Folders
app.use(express.static(path.resolve('client')));
app.use(express.static(path.resolve('bower_components')));

//Session Set-up
var sessionInfo = {
  secret: 'CookieMonster',
  resave: false,
  saveUninitialized: true,
  name: 'myCookie',
  cookie: {
    secure: false,
    httpOnly: false,
    age: 3600000
  }
};

app.use(session(sessionInfo));

//Load Models
require('./server/config/mongoose.js');

//Pass app into routes.js
var route = require('./server/config/routes.js')(app);

app.listen(port, function() {
  console.log(`listening on port: ${port}`);
});
