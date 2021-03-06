var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const blogRouter=require('./routes/blog')
const userRouter=require('./routes/user')

var app = express();

app.use(logger('dev'));
app.use(express.json());
// 兼容其他格式
app.use(express.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());

// 注册路由
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
