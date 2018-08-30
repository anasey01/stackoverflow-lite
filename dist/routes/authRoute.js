'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _UsersRoute = require('../controllers/UsersRoute');

var _UsersRoute2 = _interopRequireDefault(_UsersRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = _express2.default.Router();

authRouter.post('/signup', _UsersRoute2.default.signup);
authRouter.post('/login', _UsersRoute2.default.login);

exports.default = authRouter;
//# sourceMappingURL=authRoute.js.map