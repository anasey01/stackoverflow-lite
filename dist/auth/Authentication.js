'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Authentication = function () {
  function Authentication(connection) {
    _classCallCheck(this, Authentication);

    this.conn = connection;
    this.table = 'users';
  }

  _createClass(Authentication, [{
    key: 'registerUser',
    value: function registerUser(fullname, gender, username, password, email, callback) {
      var _this = this;

      this.conn.selectUserByUsername(username, function (err, result) {
        if (err) {
          callback(err);
        } else if (result.length < 1 && result.length !== 1) {
          _this.createUser(fullname, gender, username, password, email, callback);
        } else {
          callback('existing');
        }
      });
    }
  }, {
    key: 'createUser',
    value: function createUser(fullname, gender, username, password, email, callback) {
      this.conn.insertUser(fullname, gender, username, password, email, function (err, result) {
        if (err) {
          callback('There was an error adding user!');
        }
        callback('Welcome ' + fullname);
      });
    }
  }, {
    key: 'login',
    value: function login(username, password, callback) {
      this.conn.selectUserByUsername(username, function (err, result) {
        if (result.length < 1) {
          callback('username or password incorrect');
        } else {
          var userData = result;
          var storedHashedPassword = userData[0].password;
          var correctPassword = _bcrypt2.default.compareSync(password, storedHashedPassword);
          if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) !== 'object' || !correctPassword) {
            callback('Username or Password incorrect');
          } else {
            callback(result);
          }
        }
      });
    }
  }]);

  return Authentication;
}();

exports.default = Authentication;
//# sourceMappingURL=Authentication.js.map