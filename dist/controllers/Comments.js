'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _QuestionManager = require('./QuestionManager');

var _QuestionManager2 = _interopRequireDefault(_QuestionManager);

var _DatabaseManager = require('../net/DatabaseManager');

var _DatabaseManager2 = _interopRequireDefault(_DatabaseManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var db = new _DatabaseManager2.default();
var questionsManager = new _QuestionManager2.default(db);

var Comment = function () {
  function Comment() {
    _classCallCheck(this, Comment);
  }

  _createClass(Comment, null, [{
    key: 'createComment',
    value: function createComment(req, res) {
      var answerId = req.params.answerId;
      var questionId = req.params.questionId;
      var _req$user = req.user,
          userId = _req$user.userId,
          username = _req$user.username;
      var comment = req.body.comment;

      questionsManager.createComments(userId, +questionId, answerId, comment, username, function (error, resComment) {
        if (error) {
          return res.status(400).json({
            success: false,
            message: 'unable to add comments'
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Comment successfully added',
          resComment: resComment
        });
      });
    }
  }, {
    key: 'getComments',
    value: function getComments(req, res, next) {
      var questionId = req.params.id;
      questionsManager.getAllComments(questionId, function (error, comments) {
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'unable to get comments for this answer'
          });
        }
        req.userComment = comments;
        return next();
      });
    }
  }]);

  return Comment;
}();

exports.default = Comment;
//# sourceMappingURL=Comments.js.map