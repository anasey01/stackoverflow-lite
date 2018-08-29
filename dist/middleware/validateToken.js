'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateToken = function validateToken(req, res, next) {
  var tokenHeader = req.header('x-auth-token');
  if (!tokenHeader) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }
  try {
    var decoded = _jsonwebtoken2.default.verify(tokenHeader, process.env.PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

exports.default = validateToken;
//# sourceMappingURL=validateToken.js.map