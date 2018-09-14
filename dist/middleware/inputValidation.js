'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validation = function () {
  function validation() {
    _classCallCheck(this, validation);
  }

  _createClass(validation, null, [{
    key: 'signup',
    value: function signup(req, res, next) {
      req.check('fullname').notEmpty().withMessage('Fullname is required').isString().withMessage('Enter a string');

      req.check('gender').notEmpty().withMessage('Select your gender from the option');

      req.check('username').notEmpty().withMessage('Enter a username').isLength({ max: 10 }).withMessage('Username cannot be more than 10 characters');

      req.check('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be a minimum of 6 characters');

      req.check('email').notEmpty('Email is required').isEmail().withMessage('Enter a valid email address');

      var errors = req.validationErrors();
      if (errors) {
        return res.status(401).json({
          success: false,
          message: 'Error with Validation',
          errors: errors
        });
      }
      next();
    }
  }, {
    key: 'login',
    value: function login(req, res, next) {
      req.check('username').notEmpty().withMessage('Username required to Login').isLength({ max: 10 }).withMessage('Username cannot be more than 10 characters');

      req.check('password').notEmpty().withMessage('Password is required to login').isLength({ min: 6 }).withMessage('Password must be a minimum of 6 characters');

      var errors = req.validationErrors();
      if (errors) {
        return res.status(401).json({
          success: false,
          message: 'Error with validation',
          errors: errors
        });
      }
      next();
    }
  }]);

  return validation;
}();

exports.default = validation;
//# sourceMappingURL=inputValidation.js.map