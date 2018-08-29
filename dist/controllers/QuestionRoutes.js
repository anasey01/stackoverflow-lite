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
          return res.status(404).json({
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
        } else {
          return res.status(200).json({
            success: true,
            message: 'question successfully created',
            id: userId,
            title: title,
            content: content
          });
        }
      });
    }
  }, {
    key: 'addAnswer',
    value: function addAnswer(req, res) {
      var id = Number(req.params.id);
      var answer = req.body.answer;
      questionManager.getQuestion(id, function (result) {
        if (result.title && result.content) {
          var user_id = req.user._id;
          questionManager.createAnswer(user_id, id, answer, function (results, err) {
            var questionAndAnswer = {
              title: results.title,
              content: results.content,
              created: results.created_at,
              answers: []
            };
            questionManager.getAnswer(Number(results.id), function (answers, err) {
              console.log('Answer gotten', answers, 'And err', err);
            });
          });
        }
      });
      res.status(200).json({});
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