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

var voteRouter = _express2.default.Router();

voteRouter.get('/questions/:questionId/answers/:answerId/upvote', _validateToken2.default, _Votes2.default.getAllVotes);
voteRouter.get('/questions/:questionId/answers/:answerId/downvote', _validateToken2.default, _Votes2.default.getAllVotes);
voteRouter.post('/questions/:questionId/answers/:answerId/upvote', _validateToken2.default, _Votes2.default.upvote);
voteRouter.post('/questions/:questionId/answers/:answerId/downvote', _validateToken2.default, _Votes2.default.downvote);

exports.default = voteRouter;
//# sourceMappingURL=votesRoute.js.map