'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _route = require('./routes/route');

var _route2 = _interopRequireDefault(_route);

var _auth = require('./auth/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// USE ROUTES
app.use('/api/v1', _route2.default);
app.use('/auth', _auth2.default);

// 404 Error Handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

// Set Up PORT
app.set('port', process.env.PORT || 8080);

// FIRE Up Server to listen on PORT
app.listen(app.get('port'), function () {
  console.log('Action happening on port ' + app.get('port'));
});

exports.default = app;
//# sourceMappingURL=server.js.map