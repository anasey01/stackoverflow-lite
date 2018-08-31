'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _validateLogin = require('../middleware/validateLogin');

var _validateLogin2 = _interopRequireDefault(_validateLogin);

var _validateSignup = require('../middleware/validateSignup');

var _validateSignup2 = _interopRequireDefault(_validateSignup);

var _UsersRoute = require('../controllers/UsersRoute');

var _UsersRoute2 = _interopRequireDefault(_UsersRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = _express2.default.Router();

authRouter.post('/signup', _validateSignup2.default, _UsersRoute2.default.signup);
authRouter.post('/login', _validateLogin2.default, _UsersRoute2.default.login);

exports.default = authRouter;
//# sourceMappingURL=authRoute.js.map