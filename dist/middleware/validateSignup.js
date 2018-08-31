'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var validateSignup = function validateSignup(req, res, next) {
  var _req$body = req.body,
      fullname = _req$body.fullname,
      gender = _req$body.gender,
      username = _req$body.username,
      email = _req$body.email,
      password = _req$body.password;

  var emailRegex = /\S+@\S+\.\S+/;
  var isValidEmail = emailRegex.test(email);
  if (!fullname && !gender && !username && !email && !password) {
    return res.status(401).json({
      success: false,
      message: 'Please fill out empty field!'
    });
  }if (gender === '') {
    return res.status(401).json({
      success: false,
      message: 'Please fill in your gender'
    });
  }if (!username) {
    return res.status(401).json({
      success: false,
      message: 'Enter your username'
    });
  }if (!isValidEmail) {
    return res.status(401).json({
      success: false,
      message: 'Enter valid Email'
    });
  }
  if (password === '') {
    return res.status(401).json({
      success: false,
      message: 'Enter your password'
    });
  }if (password.length < 6) {
    return res.status(401).json({
      success: false,
      message: 'Password must be more than 6 characters'
    });
  }

  next();
};

exports.default = validateSignup;
//# sourceMappingURL=validateSignup.js.map