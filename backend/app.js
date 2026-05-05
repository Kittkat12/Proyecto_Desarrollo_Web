var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var goalsRouter = require('./routes/goals');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/tasks', tasksRouter);
app.use('/goals', goalsRouter);

app.use((req, res, next) => {
  if (req.headers.authorization && req.headers.authorization === '123456') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});


app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
