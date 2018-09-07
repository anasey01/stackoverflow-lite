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
        return res.status(200).json({ questions: data });
      });
    }
  }, {
    key: 'specificQuestion',
    value: function specificQuestion(req, res) {
      var questionId = req.params.id;
      var questionData = {};
      questionManager.getQuestion(questionId, function (result) {
        questionData.success = true;
        questionData.message = 'Questions retrieved';
        questionData.questionId = result.questionid;
        questionData.userId = result.userid;
        questionData.questionTitle = result.questiontitle;
        questionData.questionContent = result.questioncontent;
        questionData.createdAt = result.createdat;
        questionData.answers = [];
        questionManager.getAnswer(questionId, function (answer) {
          if (answer.rows.length > 1) {
            answer.rows.forEach(function (item) {
              questionData.answers.push({ item: item });
            });
            res.status(200).json(questionData);
          }
          if (answer.rows.length === 1) {
            var singleAnswer = answer.rows;
            questionData.answers.push({ singleAnswer: singleAnswer });
            res.status(200).json(questionData);
          }
        });
        res.status(200).json(questionData);
      });
    }
  }, {
    key: 'postQuestion',
    value: function postQuestion(req, res) {
      var _req$body = req.body,
          questionTitle = _req$body.questionTitle,
          questionContent = _req$body.questionContent;
      var userId = req.user.userId;

      questionManager.createQuestion(userId, questionTitle, questionContent, function (result) {
        var error = false;
        if (result === 'error') {
          error = true;
        }

        if (error) {
          return res.status(400).json({
            success: false,
            message: 'unable to create question'
          });
        }
        return res.status(200).json({
          success: true,
          message: 'question successfully created',
          userid: result.userid,
          questionid: result.questionid,
          questiontitle: result.questiontitle,
          questioncontent: result.questioncontent
        });
      });
    }
  }, {
    key: 'addAnswer',
    value: function addAnswer(req, res) {
      var questionId = Number(req.params.id);
      var answer = req.body.answer;

      questionManager.getQuestion(questionId, function (result) {
        var questionAndAnswer = {
          success: true,
          message: 'Answer added to question ' + questionId,
          questionId: result.questionid,
          userId: result.userid,
          questionTitle: result.questiontitle,
          questionContent: result.questioncontent,
          createdAt: result.createdat,
          answers: []
        };

        if (result.questiontitle && result.questioncontent) {
          var userId = req.user.userId;

          questionManager.createAnswer(userId, questionId, answer, function (results, err) {
            if (results.rows.length > 1) {
              results.rows.forEach(function (item) {
                questionAndAnswer.answers.push(item);
              });
              res.status(200).json(questionAndAnswer);
            }
            if (results.rows.length === 1) {
              var singleAnswer = results.rows;
              questionAndAnswer.answers.push(singleAnswer);
              res.status(200).json(questionAndAnswer);
            }
          });
        } else {
          res.status(404).json({
            success: false,
            message: 'No Answer found'
          });
        }
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
    key: 'updateQuestion',
    value: function updateQuestion(req, res) {
      var _req$params = req.params,
          questionId = _req$params.questionId,
          answerId = _req$params.answerId;

      var currentUserId = req.user.userId;
      questionManager.getSpecificAnswer(questionId, answerId, function (err, answerResult) {
        req.userAnswer = answerResult;
      });
      questionManager.getQuestion(questionId, function (result) {
        var questionUserId = result.userid;
        if (currentUserId === questionUserId) {
          questionManager.markAnswer(answerId, function (ansResult) {
            if (ansResult === 'successfully marked') {
              res.status(200).json({
                success: true,
                message: 'Answer marked as approved!'
              });
            } else {
              res.status(500).json({
                success: false,
                message: 'unable to mark answer'
              });
            }
          });
        } else if (currentUserId === req.userAnswer.userid) {
          var answer = req.body.answer;

          questionManager.updateAnswer(answerId, answer, function (ansResult) {
            if (ansResult === 'answer updated') {
              res.status(200).json({
                success: true,
                message: 'Your answer has been updated'
              });
            } else {
              res.status(500).json({
                success: false,
                message: 'Not updated, try again'
              });
            }
          });
        } else {
          res.status(401).json({
            success: false,
            message: 'Not authorized to approve answer'
          });
        }
      });
    }
  }, {
    key: 'notFound',
    value: function notFound(req, res) {
      res.status(404).json({
        status: false,
        message: 'Not Found!'
      });
    }
  }]);

  return QuestionRoute;
}();

exports.default = QuestionRoute;
//# sourceMappingURL=QuestionRoutes.js.map