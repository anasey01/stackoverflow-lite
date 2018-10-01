'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DatabaseManager = require('../net/DatabaseManager');

var _DatabaseManager2 = _interopRequireDefault(_DatabaseManager);

var _QuestionManager = require('./QuestionManager');

var _QuestionManager2 = _interopRequireDefault(_QuestionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var db = new _DatabaseManager2.default();
var questionManager = new _QuestionManager2.default(db);

var Votes = function () {
  function Votes() {
    _classCallCheck(this, Votes);
  }

  _createClass(Votes, null, [{
    key: 'upvote',
    value: function upvote(req, res, next) {
      var _req$params = req.params,
          questionId = _req$params.questionId,
          answerId = _req$params.answerId;
      var _req$user = req.user,
          userId = _req$user.userId,
          username = _req$user.username;

      questionManager.createUpvotes(+questionId, +answerId, userId, username, function (err, vote) {
        if (err) {
          return res.status(401).json({
            success: false,
            messgae: 'unable to upvote answer'
          });
        }
        return next();
      });
    }
  }, {
    key: 'downvote',
    value: function downvote(req, res, next) {
      var _req$user2 = req.user,
          userId = _req$user2.userId,
          username = _req$user2.username;
      var _req$params2 = req.params,
          questionId = _req$params2.questionId,
          answerId = _req$params2.answerId;

      questionManager.createDownvotes(+questionId, +answerId, userId, username, function (err, vote) {
        if (err) {
          return res.status(401).json({
            success: false,
            messgae: 'unable to downote answer'
          });
        }
        return next();
      });
    }
  }, {
    key: 'getTotalUpvotes',
    value: function getTotalUpvotes(req, res, next) {
      var _req$params3 = req.params,
          questionId = _req$params3.questionId,
          answerId = _req$params3.answerId;

      questionManager.getUpvotes(+questionId, +answerId, function (error, upvotes) {
        req.totalUpvotes = upvotes.length;
        return next();
      });
    }
  }, {
    key: 'getTotalDownvotes',
    value: function getTotalDownvotes(req, res, next) {
      var _req$params4 = req.params,
          questionId = _req$params4.questionId,
          answerId = _req$params4.answerId;

      questionManager.getDownvotes(+questionId, +answerId, function (error, downvotes) {
        req.totalDownvotes = downvotes.length;
        return next();
      });
    }
  }, {
    key: 'saveUpvotes',
    value: function saveUpvotes(req, res) {
      var totalUpvotes = req.totalUpvotes;
      var _req$params5 = req.params,
          questionId = _req$params5.questionId,
          answerId = _req$params5.answerId;

      questionManager.updateAnswerWithUpvotes(+questionId, +answerId, totalUpvotes, function (error, data) {
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'Error saving upvotes for this answer',
            error: error
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Successfully upvoted this answer',
          answerData: data
        });
      });
    }
  }, {
    key: 'saveDownvotes',
    value: function saveDownvotes(req, res) {
      var totalDownvotes = req.totalDownvotes;
      var _req$params6 = req.params,
          questionId = _req$params6.questionId,
          answerId = _req$params6.answerId;

      questionManager.updateAnswerWithDownvotes(+questionId, +answerId, totalDownvotes, function (error, data) {
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'Error saving downvotes for this answer',
            error: error
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Successfully downvoted this answer',
          answerData: data
        });
      });
    }

    // static getAllVotes(req, res) {

    // }

  }]);

  return Votes;
}();

exports.default = Votes;
//# sourceMappingURL=Votes.js.map