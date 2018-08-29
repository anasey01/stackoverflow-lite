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

var _UsersRoute = require('../controllers/UsersRoute');

var _UsersRoute2 = _interopRequireDefault(_UsersRoute);

var _validateToken = require('../middleware/validateToken');

var _validateToken2 = _interopRequireDefault(_validateToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = _express2.default.Router();

authRouter.use(_bodyParser2.default.urlencoded({ extended: false }));
authRouter.use(_bodyParser2.default.json());
authRouter.use((0, _morgan2.default)(':method :url :response-time'));

authRouter.post('/signup', _UsersRoute2.default.signup);
authRouter.post('/login', _UsersRoute2.default.login);

exports.default = authRouter;
//# sourceMappingURL=authRoute.js.map