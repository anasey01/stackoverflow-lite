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
        return res.status(200).json(data);
      });
    }
  }, {
    key: 'specificQuestion',
    value: function specificQuestion(req, res) {
      var questionId = req.params.id;
      questionManager.getQuestion(questionId, function (result) {
        return res.status(200).json(result);
      });
    }
  }, {
    key: 'postQuestion',
    value: function postQuestion(req, res) {
      var title = req.body.title;
      var content = req.body.content;
      var userId = req.user._id;
      questionManager.createQuestion(userId, title, content, function (result) {
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
          id: userId,
          title: title,
          content: content
        });
      });
    }
  }, {
    key: 'addAnswer',
    value: function addAnswer(req, res) {
      var id = Number(req.params.id);
      var answer = req.body;
      questionManager.getQuestion(id, function (result) {
        var questionAndAnswer = {
          id: result.id,
          userId: result.user_id,
          title: result.title,
          content: result.content,
          created: result.created_at,
          answers: []
        };
        if (result.title && result.content) {
          var userId = questionAndAnswer.userId;
          questionManager.createAnswer(userId, id, answer, function (results, err) {
            if (results.rows.length > 1) {
              results.rows.forEach(function (item) {
                questionAndAnswer.answers.push(item);
              });
              res.status(200).json(questionAndAnswer);
            }
            if (results.rows.length === 1) {
              var singleAnswer = results.rows;
              questionAndAnswer.answers.push({ singleAnswer: singleAnswer });
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