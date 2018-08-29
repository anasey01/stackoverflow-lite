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
    value: function createQuestion(user_id, title, content, callback) {
      var _this = this;

      this.conn.insertQuestion(user_id, title, content, function (err, result) {
        if (err) {
          callback('error');
        }
        _this.conn.selectById(_this.table, user_id, function (res, err) {
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
    value: function getQuestion(id, callback) {
      this.conn.selectById(this.table, id, function (result, err) {
        if (err) {
          callback(err);
        }
        callback(result);
      });
    }
  }, {
    key: 'createAnswer',
    value: function createAnswer(user_id, question_id, answer, callback) {
      var _this2 = this;

      this.conn.insertAnswer(user_id, question_id, answer, function (err, result) {
        if (err) {
          callback(err);
        }
        _this2.getQuestion(question_id, function (result, err) {
          callback(result);
        });
      });
    }
  }, {
    key: 'getAnswer',
    value: function getAnswer(question_id, callback) {
      var _this3 = this;

      this.conn.selectAnswer(this.answerTable, question_id, function (err, result) {
        console.log('Table is ', _this3.answerTable, 'question id is ', question_id);
        console.log('Result from geting answer ', result, 'error is ', err);
        callback(result, err);
      });
    }
  }, {
    key: 'getQuestionAnswer',
    value: function getQuestionAnswer(id, callback) {
      this.getQuestion(id, function (result, err) {
        console.log('get question from getQuestionAndAnswer', result, 'err', err);
      });
    }
  }]);

  return QuestionManager;
}();

exports.default = QuestionManager;
//# sourceMappingURL=QuestionManager.js.map