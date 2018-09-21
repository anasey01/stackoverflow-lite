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
    value: function createQuestion(userId, questionTitle, questionContent, username, callback) {
      this.conn.insertQuestion(userId, questionTitle, questionContent, username, function (err, result) {
        callback(err, result.rows);
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
      this.conn.selectByQuestionId(this.table, questionId, function (error, result) {
        callback(error, result);
      });
    }
  }, {
    key: 'getUserQuestions',
    value: function getUserQuestions(userId, callback) {
      this.conn.selectQuestionByUserId(userId, function (error, result) {
        callback(error, result);
      });
    }
  }, {
    key: 'createAnswer',
    value: function createAnswer(userId, questionId, answer, answerNumber, username, callback) {
      this.conn.insertAnswer(userId, questionId, answer, answerNumber, username, function (err, result) {
        callback(err, result);
      });
    }
  }, {
    key: 'getSpecificAnswer',
    value: function getSpecificAnswer(questionId, answerId, callback) {
      this.conn.selectOneAnswer(questionId, answerId, function (result, err) {
        callback(result, err);
      });
    }
  }, {
    key: 'getQuestionAndAnswer',
    value: function getQuestionAndAnswer(questionId, callback) {
      this.conn.selectQuestionAndAnswer(questionId, function (err, result) {
        callback(err, result);
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
    key: 'markAnswer',
    value: function markAnswer(answerNumber, callback) {
      this.conn.updateMarkedAnswer(answerNumber, function (err, result) {
        if (err) {
          callback('error');
        }
        callback('successfully marked');
      });
    }
  }, {
    key: 'updateAnswer',
    value: function updateAnswer(answerNumber, answer, questionId, callback) {
      this.conn.updateQuestionAnswer(answerNumber, answer, questionId, function (err, result) {
        callback(err, result.rows);
      });
    }
  }, {
    key: 'createVotes',
    value: function createVotes(questionId, answerId, userId, currentVote, otherVote, username, callback) {
      this.conn.insertVotes(questionId, answerId, userId, currentVote, otherVote, username, function (err, result) {
        callback(err, result);
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