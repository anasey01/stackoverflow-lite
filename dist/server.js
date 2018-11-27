'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _usersRoute = require('./v1/routes/usersRoute');

var _usersRoute2 = _interopRequireDefault(_usersRoute);

var _questionsRoute = require('./v1/routes/questionsRoute');

var _questionsRoute2 = _interopRequireDefault(_questionsRoute);

var _answersRoute = require('./v1/routes/answersRoute');

var _answersRoute2 = _interopRequireDefault(_answersRoute);

var _commentsRoute = require('./v1/routes/commentsRoute');

var _commentsRoute2 = _interopRequireDefault(_commentsRoute);

var _votesRoute = require('./v1/routes/votesRoute');

var _votesRoute2 = _interopRequireDefault(_votesRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)('dev'));
app.use('/api/v1/auth', _usersRoute2.default);
app.use('/api/v1/', _questionsRoute2.default);
app.use('/api/v1/', _answersRoute2.default);
app.use('/api/v1/', _commentsRoute2.default);
app.use('/api/v1/', _votesRoute2.default);

app.use(function (req, res, next) {
  var error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    success: false,
    error: {
      message: error.message
    }
  });
});

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), function () {
  // eslint-disable-next-line no-console
  console.log('Action happening on port ' + app.get('port'));
});

exports.default = app;