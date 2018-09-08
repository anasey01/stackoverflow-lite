'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _validateToken = require('../middleware/validateToken');

var _validateToken2 = _interopRequireDefault(_validateToken);

var _Votes = require('../controllers/Votes');

var _Votes2 = _interopRequireDefault(_Votes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.put('/questions/:questionId/answers/:answerId/upvote', _validateToken2.default, _Votes2.default.upvote);
router.put('/questions/:questionId/answers/:answerId/downvote', _validateToken2.default, _Votes2.default.downvote);

exports.default = router;
//# sourceMappingURL=votesRoute.js.map