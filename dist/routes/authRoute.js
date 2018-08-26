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

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _Authentication = require('../auth/Authentication');

var _Authentication2 = _interopRequireDefault(_Authentication);

var _DatabaseManager = require('../controllers/DatabaseManager');

var _DatabaseManager2 = _interopRequireDefault(_DatabaseManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = new _DatabaseManager2.default();
var auth = new _Authentication2.default(db);

var authRouter = _express2.default.Router();
authRouter.use(_bodyParser2.default.urlencoded({ extended: false }));
authRouter.use(_bodyParser2.default.json());
authRouter.use((0, _morgan2.default)(':method :url :response-time'));

authRouter.get('/signup', function (req, res) {
  res.status(200).json({
    success: true,
    message: 'Welcome to signup API route'
  });
});

authRouter.post('/signup', function (req, res) {
  var obj = req.body;
  auth.registerUser(obj.fullname, obj.gender, obj.username, obj.password, obj.email, function (result) {
    if (result === 'existing') {
      res.status(400).json({
        success: false,
        message: 'username already exists'
      });
    } else {
      res.status(200).json({
        status: true,
        message: 'user succesfully registered'
      });
    }
  });
});

authRouter.post('/login', function (req, res) {
  var obj = req.body;
  auth.login(obj.username, obj.password, function (result) {
    var token = _jsonwebtoken2.default.sign({
      _id: result.id,
      name: result.fullname,
      gender: result.gender,
      username: result.username,
      email: result.email
    }, 'jwtPrivateKey');
    res.json(token);
  });
});

exports.default = authRouter;
//# sourceMappingURL=authRoute.js.map