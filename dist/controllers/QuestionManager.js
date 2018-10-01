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
    value: function getUserQuestions(username, callback) {
      this.conn.selectQuestionByUsername(username, function (error, result) {
        callback(error, result);
      });
    }
  }, {
    key: 'searchQuestion',
    value: function searchQuestion(questionQuery, callback) {
      this.conn.searchAllQuestion(questionQuery, function (error, match) {
        callback(error, match);
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
    key: 'orderedByMostAnswers',
    value: function orderedByMostAnswers(username, callback) {
      this.conn.selectMostAnswered(username, function (error, mostAnswer) {
        callback(error, mostAnswer.rows);
      });
    }
  }, {
    key: 'createUpvotes',
    value: function createUpvotes(questionId, answerId, userId, username, callback) {
      this.conn.insertUpvotes(questionId, answerId, userId, username, function (err, vote) {
        callback(err, vote);
      });
    }
  }, {
    key: 'createDownvotes',
    value: function createDownvotes(questionId, answerId, userId, username, callback) {
      this.conn.insertDownvotes(questionId, answerId, userId, username, function (err, vote) {
        callback(err, vote);
      });
    }
  }, {
    key: 'getUpvotes',
    value: function getUpvotes(questionId, answerId, callback) {
      this.conn.selectUpvotes(questionId, answerId, function (err, upvotes) {
        callback(err, upvotes);
      });
    }
  }, {
    key: 'getDownvotes',
    value: function getDownvotes(questionId, answerId, callback) {
      this.conn.selectDownvotes(questionId, answerId, function (err, upvotes) {
        callback(err, upvotes);
      });
    }
  }, {
    key: 'updateAnswerWithUpvotes',
    value: function updateAnswerWithUpvotes(questionId, answerId, totalUpvotes, callback) {
      this.conn.insertTotalNumberOfUpvotes(questionId, answerId, totalUpvotes, function (error, data) {
        callback(error, data);
      });
    }
  }, {
    key: 'updateAnswerWithDownvotes',
    value: function updateAnswerWithDownvotes(questionId, answerId, totalDownvotes, callback) {
      this.conn.insertTotalNumberOfDownvotes(questionId, answerId, totalDownvotes, function (error, data) {
        callback(error, data);
      });
    }
  }, {
    key: 'createComments',
    value: function createComments(userId, questionId, answerId, comment, username, callback) {
      this.conn.insertComment(userId, questionId, answerId, comment, username, function (error, resComment) {
        callback(error, resComment);
      });
    }
  }, {
    key: 'getAllComments',
    value: function getAllComments(questionId, callback) {
      this.conn.selectComments(questionId, function (error, comments) {
        callback(error, comments);
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