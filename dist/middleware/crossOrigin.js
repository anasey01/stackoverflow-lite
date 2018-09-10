'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cors = function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'origin, x-requested-with, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
    return res.status(200).json({});
  }
  next();
};

exports.default = cors;
//# sourceMappingURL=crossOrigin.js.map