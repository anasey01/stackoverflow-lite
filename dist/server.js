'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _authRoute = require('./routes/authRoute');

var _authRoute2 = _interopRequireDefault(_authRoute);

var _votesRoute = require('./routes/votesRoute');

var _votesRoute2 = _interopRequireDefault(_votesRoute);

var _error = require('./middleware/error');

var _error2 = _interopRequireDefault(_error);

var _questionRoute = require('./routes/questionRoute');

var _questionRoute2 = _interopRequireDefault(_questionRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());
app.use('/api/v1', _questionRoute2.default);
app.use('/api/v1/auth/', _authRoute2.default);
app.use('/api/v1', _votesRoute2.default);
app.use((0, _morgan2.default)(':method :url :response-time'));
app.use(_error2.default.notFound);
app.use(_error2.default.serverError);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), function () {
  console.log('Action happening on port ' + app.get('port'));
});

exports.default = app;
//# sourceMappingURL=server.js.map