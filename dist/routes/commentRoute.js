'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _validateToken = require('../middleware/validateToken');

var _validateToken2 = _interopRequireDefault(_validateToken);

var _Comments = require('../controllers/Comments');

var _Comments2 = _interopRequireDefault(_Comments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/questions/:questionId/answers/:answerId/comment', _validateToken2.default, _Comments2.default.createComment);

exports.default = router;
//# sourceMappingURL=commentRoute.js.map