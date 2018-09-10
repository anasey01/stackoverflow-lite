'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _validateToken = require('../middleware/validateToken');

var _validateToken2 = _interopRequireDefault(_validateToken);

var _validateAuthor = require('../middleware/validateAuthor');

var _validateAuthor2 = _interopRequireDefault(_validateAuthor);

var _QuestionRoutes = require('../controllers/QuestionRoutes');

var _QuestionRoutes2 = _interopRequireDefault(_QuestionRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/questions', _QuestionRoutes2.default.allQuestion);
router.get('/questions/:id', _validateToken2.default, _QuestionRoutes2.default.specificQuestion);
router.get('/question/:userId', _validateToken2.default, _QuestionRoutes2.default.getAllQuestionsByUser);
router.post('/questions', _validateToken2.default, _QuestionRoutes2.default.postQuestion);
router.post('/questions/:id/answers', _validateToken2.default, _QuestionRoutes2.default.addAnswer);
router.delete('/questions/:id/', _validateToken2.default, _validateAuthor2.default, _QuestionRoutes2.default.deleteQuestion);
router.put('/questions/:questionId/answers/:answerNumber', _validateToken2.default, _QuestionRoutes2.default.updateAnswer);
router.get('*', _QuestionRoutes2.default.notFound);

exports.default = router;
//# sourceMappingURL=questionRoute.js.map