require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var goalsRouter = require('./routes/goals');

var connectDB = require('./config/db');

var app = express();

async function initializeDatabase() {
  try {
    if (process.env.DATABASE === 'MONGODB') {
      await connectDB();
      console.log("MongoDB conectado");
    }
  } catch (error) {
    console.error("Error inicializando base de datos:", error);
  }
}

initializeDatabase();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/goals', goalsRouter);

module.exports = app;
