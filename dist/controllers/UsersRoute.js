'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _UserManager = require('./UserManager');

var _UserManager2 = _interopRequireDefault(_UserManager);

var _DatabaseManager = require('../net/DatabaseManager');

var _DatabaseManager2 = _interopRequireDefault(_DatabaseManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = new _DatabaseManager2.default();
var userManager = new _UserManager2.default(db);

var UsersRoutes = {
  login: function login(req, res) {
    userManager.login(req.body.username, req.body.password, function (result) {
      if (!result[0].userid) {
        return res.status(401).json({
          success: false,
          message: 'username or password incorrect'
        });
      }
      var token = _jsonwebtoken2.default.sign({
        userId: result[0].userid,
        username: result[0].username
      }, process.env.PRIVATE_KEY);
      return res.header('x-auth-token', token).status(200).json({
        success: true,
        message: 'Successfully logged in',
        token: token
      });
    });
  },
  signup: function signup(req, res) {
    var _req$body = req.body,
        fullname = _req$body.fullname,
        gender = _req$body.gender,
        username = _req$body.username,
        password = _req$body.password,
        email = _req$body.email;

    userManager.registerUser(fullname, gender, username, password, email, function (result) {
      if (result === 'existing') {
        res.status(401).json({
          success: false,
          message: 'username already exists'
        });
      } else {
        var token = _jsonwebtoken2.default.sign({
          username: result.username,
          email: result.email
        }, process.env.PRIVATE_KEY);
        res.header('x-auth-token', token).status(200).json({
          success: true,
          message: 'user succesfully registered'
        });
      }
    });
  }
};

exports.default = UsersRoutes;
//# sourceMappingURL=UsersRoute.js.map