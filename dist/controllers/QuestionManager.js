'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuestionManager = function () {
  function QuestionManager(connection) {
    _classCallCheck(this, QuestionManager);

    this.conn = connection;
    this.table = 'questions';
    this.answerTable = 'answers';
  }

  _createClass(QuestionManager, [{
    key: 'createQuestion',
    value: function createQuestion(userId, questionTitle, questionContent, callback) {
      var _this = this;

      this.conn.insertQuestion(userId, questionTitle, questionContent, function (err, result) {
        if (err) {
          callback('error');
        }
        _this.conn.selectById(_this.table, userId, function (res, err) {
          if (err) {
            callback(err);
          } else {
            callback(res);
          }
        });
      });
    }
  }, {
    key: 'getAllQuestion',
    value: function getAllQuestion(callback) {
      this.conn.selectQuestions(function (result, err) {
        if (err) {
          callback('There was an error retrieving questions');
        }
        callback(result);
      });
    }
  }, {
    key: 'getQuestion',
    value: function getQuestion(questionId, callback) {
      this.conn.selectByQuestionId(this.table, questionId, function (result, err) {
        if (err) {
          callback(err);
        }
        callback(result);
      });
    }
  }, {
    key: 'createAnswer',
    value: function createAnswer(userId, questionId, answer, callback) {
      var _this2 = this;

      this.conn.insertAnswer(userId, questionId, answer, function (err, result) {
        if (err) {
          callback(err);
        }
        _this2.getAnswer(questionId, function (result, err) {
          callback(result);
        });
      });
    }
  }, {
    key: 'getAnswer',
    value: function getAnswer(questionId, callback) {
      this.conn.selectAnswer(this.answerTable, questionId, function (err, result) {
        callback(result, err);
      });
    }
  }, {
    key: 'deleteOne',
    value: function deleteOne(questionId, callback) {
      this.conn.deleteQuestionById(this.table, questionId, function (result, err) {
        callback(result, err);
      });
    }
  }]);

  return QuestionManager;
}();

exports.default = QuestionManager;
//# sourceMappingURL=QuestionManager.js.map