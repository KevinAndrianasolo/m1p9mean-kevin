var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var profitRouter = require('./routes/profit');
var authRouter = require('./routes/auth');
var mailRouter = require('./routes/mail');


// Middleware
var AuthMiddleware = require('./middleware/AuthMiddleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'm1p9mean-kevin-client/dist/m1p9mean-kevin-client')));

app.use(AuthMiddleware);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/reflect', apiRouter);
app.use('/api/profit', profitRouter);
app.use('/auth', authRouter);
app.use('/mail', mailRouter);




// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.all('*', function(req, res) {
  let indexPath = path.resolve(__dirname, "m1p9mean-kevin-client/dist/m1p9mean-kevin-client/index.html");
  res.sendFile(indexPath);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
