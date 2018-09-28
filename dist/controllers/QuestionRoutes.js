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

var QuestionRoute = function () {
  function QuestionRoute() {
    _classCallCheck(this, QuestionRoute);
  }

  _createClass(QuestionRoute, null, [{
    key: 'allQuestion',
    value: function allQuestion(req, res) {
      questionManager.getAllQuestion(function (data, err) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'No question found'
          });
        }
        return res.status(200).json({
          success: true,
          message: 'All Questions Retrieved',
          questions: data
        });
      });
    }
  }, {
    key: 'specificQuestion',
    value: function specificQuestion(req, res) {
      var questionId = req.params.id;
      questionManager.getQuestion(questionId, function (error, result) {
        var question = result;
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'Failed to fetch question'
          });
        }
        return res.status(200).json({
          success: true,
          message: 'successfully fetched question',
          question: question
        });
      });
    }
  }, {
    key: 'postQuestion',
    value: function postQuestion(req, res) {
      var _req$body = req.body,
          questionTitle = _req$body.questionTitle,
          questionContent = _req$body.questionContent;
      var _req$user = req.user,
          userId = _req$user.userId,
          username = _req$user.username;

      questionManager.createQuestion(userId, questionTitle, questionContent, username, function (err, result) {
        if (err) {
          return res.status(400).json({
            success: false,
            message: 'unable to create question'
          });
        }
        return res.status(200).json({
          success: true,
          message: 'question successfully created',
          username: result[0].username,
          userId: result[0].userid,
          questionId: result[0].questionid,
          questionTitle: result[0].questiontitle,
          questionContent: result[0].questioncontent,
          createdAt: result[0].createdat
        });
      });
    }
  }, {
    key: 'addAnswer',
    value: function addAnswer(req, res) {
      var questionId = Number(req.params.id);
      var _req$user2 = req.user,
          userId = _req$user2.userId,
          username = _req$user2.username;
      var answer = req.body.answer;

      questionManager.getQuestionAndAnswer(questionId, function (err, result) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'unable to retrieve answers'
          });
        }
        var answerNumber = result.length + 1;
        questionManager.createAnswer(userId, questionId, answer, answerNumber, username, function (error, data) {
          if (error) {
            return res.status(500).json({
              success: false,
              message: 'Unable to add answer'
            });
          }
          var answerInfo = data.rows[0];
          return res.status(200).json({
            success: true,
            message: 'Your answer has been successfully added',
            answerInfo: answerInfo
          });
        });
      });
    }
  }, {
    key: 'getAnswer',
    value: function getAnswer(req, res) {
      var questionId = Number(req.params.id);
      questionManager.getQuestionAndAnswer(questionId, function (err, result) {
        return res.status(200).json({
          success: true,
          message: result
        });
      });
    }
  }, {
    key: 'getAllQuestionsByUser',
    value: function getAllQuestionsByUser(req, res) {
      var username = req.user.username;

      questionManager.getUserQuestions(username, function (error, result) {
        var userQuestions = result;
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'unable to retrieve questions'
          });
        }
        return res.status(200).json({
          success: true,
          message: 'All Questions by User',
          userQuestions: userQuestions
        });
      });
    }
  }, {
    key: 'deleteQuestion',
    value: function deleteQuestion(req, res) {
      var id = req.params.id;

      questionManager.deleteOne(id, function (result, err) {
        var isDeleted = '';
        if (result.rowCount === 1) {
          isDeleted = 'deleted';
        }
        if (isDeleted === 'deleted') {
          return res.status(200).json({
            success: true,
            message: 'Question deleted!'
          });
        }
        if (isDeleted === '') {
          return res.status(401).json({
            success: false,
            message: 'Unable to delete question'
          });
        }
      });
    }
  }, {
    key: 'updateAnswer',
    value: function updateAnswer(req, res) {
      var _req$params = req.params,
          questionId = _req$params.questionId,
          answerNumber = _req$params.answerNumber;
      var answer = req.body.answer;

      questionManager.updateAnswer(answerNumber, answer, questionId, function (error, answerUpdate) {
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'Unable to update Answer'
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Your answer has been updated',
          answer: answerUpdate[0]
        });
      });
    }
  }, {
    key: 'mostAnswers',
    value: function mostAnswers(req, res) {
      var username = req.user.username;

      questionManager.orderedByMostAnswers(username, function (error, mostAnswers) {
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'unable to get most answered question'
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Questions by user with the most answers',
          mostAnswers: mostAnswers
        });
      });
    }
  }, {
    key: 'searchQuestion',
    value: function searchQuestion(req, res) {
      var queryParameter = req.query.q;
      questionManager.searchQuestion(queryParameter, function (error, match) {
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'An error occurred while searching for question'
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Search result successful',
          match: match
        });
      });
    }
  }, {
    key: 'notFound',
    value: function notFound(req, res) {
      return res.status(404).json({
        status: false,
        message: 'Not Found!'
      });
    }
  }]);

  return QuestionRoute;
}();

exports.default = QuestionRoute;
//# sourceMappingURL=QuestionRoutes.js.map