'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var validateLogin = function validateLogin(req, res, next) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  if (!username && !password) {
    return res.status(401).json({
      success: false,
      message: 'username or password required'
    });
  }if (password.length < 6) {
    return res.status(401).json({
      success: false,
      message: 'Password must be at least 6 characters'
    });
  }
  next();
};

exports.default = validateLogin;
//# sourceMappingURL=validateLogin.js.map