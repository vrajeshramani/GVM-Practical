var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// Users
var usersRouter = require('./routes/users.routers');
var usersEventRouter = require('./routes/event.router');

// Admin
var adminRouter = require('./routes/admin.router');
var adminEventRouter = require('./routes/admin/event.controller');

var app = express();

// Database Connection Function
const databaseConnection = require('./databaseConnection/db')
databaseConnection()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// Users Route
app.use('/v1/api/users', usersRouter);
app.use('/v1/api/event', usersEventRouter);

// Admin Rote
app.use('/v1/api/admin', adminRouter);
app.use('/v1/api/admin/event', adminEventRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
