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
    value: function upvote(req, res) {
      var _req$params = req.params,
          questionId = _req$params.questionId,
          answerId = _req$params.answerId;
      var _req$user = req.user,
          userId = _req$user.userId,
          username = _req$user.username;

      questionManager.createVotes(Number(questionId), Number(answerId), userId, 'upvotes', 'downvotes', username, function (err, vote) {
        if (err) {
          return res.status(401).json({
            success: false,
            messgae: 'unable to vote'
          });
        }
        return res.status(200).json({
          success: true,
          messgage: 'stats for votes',
          vote: vote
        });
      });
    }
  }, {
    key: 'downvote',
    value: function downvote(req, res) {
      var _req$user2 = req.user,
          userId = _req$user2.userId,
          username = _req$user2.username;
      var _req$params2 = req.params,
          questionId = _req$params2.questionId,
          answerId = _req$params2.answerId;

      questionManager.createVotes(Number(questionId), Number(answerId), userId, 'downvotes', 'upvotes', username, function (err, vote) {
        if (err) {
          return res.status(401).json({
            success: false,
            messgae: 'unable to vote'
          });
        }
        return res.status(200).json({
          success: true,
          messgage: 'stats for votes',
          vote: vote
        });
      });
    }
  }, {
    key: 'getAllVotes',
    value: function getAllVotes(req, res) {
      var _req$params3 = req.params,
          questionId = _req$params3.questionId,
          answerId = _req$params3.answerId;

      questionManager.getVotes(Number(questionId), Number(answerId), function (err, allVotes) {
        if (err) {
          return res.status(401).json({
            success: false,
            message: 'unable to get all votes'
          });
        }
        return res.status(200).json({
          success: true,
          message: 'All votes',
          allVotes: allVotes
        });
      });
    }
  }]);

  return Votes;
}();

exports.default = Votes;
//# sourceMappingURL=Votes.js.map