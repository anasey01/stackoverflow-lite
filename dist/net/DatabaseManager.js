'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pg = require('pg');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _dbConfig = require('../model/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

var _helper = require('../helper/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DbManager = function () {
  function DbManager() {
    _classCallCheck(this, DbManager);

    var configString = '';
    if (process.env.NODE_ENV) {
      if (process.env.NODE_ENV.trim() === 'test') configString = _dbConfig2.default.test;
      if (process.env.NODE_ENV.trim() === 'production') configString = _dbConfig2.default.production;
    }
    this.pool = new _pg.Pool(configString || _dbConfig2.default.development);
    this.createAllTables();
  }

  _createClass(DbManager, [{
    key: 'createAllTables',
    value: function createAllTables() {
      var _this = this;

      var usersQuery = '\n    CREATE TABLE IF NOT EXISTS users(\n      userId SERIAL NOT NULL PRIMARY KEY,\n      fullname text NOT NULL,\n      gender varchar(1) NOT NULL,\n      username varchar(25) UNIQUE NOT NULL,\n      password text NOT NULL,\n      email varchar(150) UNIQUE NOT NULL,\n      createdAt TIMESTAMP NOT NULL DEFAULT NOW()\n    );';
      var questionsQuery = '\n    CREATE TABLE IF NOT EXISTS questions(\n      questionId SERIAL NOT NULL PRIMARY KEY,\n      userId INTEGER REFERENCES users(userId) ON DELETE CASCADE,\n      username varchar(25) REFERENCES users(username) ON DELETE CASCADE,\n      questionTitle TEXT NOT NULL,\n      questionContent TEXT NOT NULL,\n      createdAt TIMESTAMP NOT NULL DEFAULT NOW()\n    );';
      var answersQuery = '\n    CREATE TABLE IF NOT EXISTS answers(\n      answerId SERIAL NOT NULL PRIMARY KEY,\n      accepted BOOLEAN NOT NULL,\n      upvotes INT NOT NULL,\n      downvotes INT NOT NULL,\n      questionId INTEGER REFERENCES questions(questionId) ON DELETE CASCADE,\n      userId INTEGER REFERENCES users(userId) ON DELETE CASCADE,\n      username varchar(25) REFERENCES users(username) ON DELETE CASCADE,\n      answer TEXT NOT NULL,\n      answerNumber INT NOT NULL,\n      createdAt TIMESTAMP NOT NULL DEFAULT NOW()\n    );';
      var commentsQuery = '\n    CREATE TABLE IF NOT EXISTS comments(\n      commentId SERIAL NOT NULL PRIMARY KEY,\n      comment TEXT NOT NULL,\n      questionId INTEGER REFERENCES questions(questionId) ON DELETE CASCADE,\n      userId INTEGER REFERENCES users(userId) ON DELETE CASCADE,\n      answerId INTEGER REFERENCES answers(answerId) ON DELETE CASCADE,\n      username varchar(25) REFERENCES users(username) ON DELETE CASCADE,\n      createdAt TIMESTAMP NOT NULL DEFAULT NOW()\n    );';
      var votesQuery = '\n    CREATE TABLE IF NOT EXISTS votes(\n      voteId SERIAL NOT NULL PRIMARY KEY,\n      upvotes INTEGER NOT NULL,\n      downvotes INTEGER NOT NULL,\n      username varchar(25) REFERENCES users(username) ON DELETE CASCADE,\n      questionId INTEGER REFERENCES questions(questionId) ON DELETE CASCADE,\n      userId INTEGER REFERENCES users(userId) ON DELETE CASCADE,\n      answerId INTEGER REFERENCES answers(answerId) ON DELETE CASCADE,\n      createdAt TIMESTAMP NOT NULL DEFAULT NOW()\n    );';

      this.pool.query(usersQuery).then(function (data) {
        _helper2.default.log('Users Table Created');
        _this.pool.query(questionsQuery).then(function (data) {
          _helper2.default.log('Questions Table Created');
          _this.pool.query(answersQuery).then(function (data) {
            _helper2.default.log('Answers Table Created');
            _this.pool.query(commentsQuery).then(function (data) {
              _helper2.default.log('comments Table Created');
              _this.pool.query(votesQuery).then(function (data) {
                _helper2.default.log('Votes table Created');
              }).catch(function (err) {
                return _helper2.default.log('Err creating votes table', err);
              });
            }).catch(function (err) {
              return _helper2.default.log('Error creating comments table', err);
            });
          }).catch(function (err) {
            return _helper2.default.log('Error creating Answers table', err);
          });
        }).catch(function (err) {
          return _helper2.default.log('Error creating Quesions table', err);
        });
      }).catch(function (err) {
        return _helper2.default.log('Error creating Users table', err);
      });
    }
  }, {
    key: 'insertUser',
    value: function insertUser(fullname, gender, username, password, email, callback) {
      var salt = _bcrypt2.default.genSaltSync(10);
      var hashed = _bcrypt2.default.hashSync(password, salt);
      password = hashed;
      var query = 'INSERT INTO users (fullname, gender, username, password, email) VALUES($1, $2, $3, $4, $5);';
      var values = [fullname, gender, username, password, email];
      this.pool.query(query, values, function (error, result) {
        if (error) {
          var err = new Error();
          return err;
        }
        callback(error, result);
      });
    }
  }, {
    key: 'selectUserByUsername',
    value: function selectUserByUsername(username, callback) {
      var query = {
        name: 'fetch-username',
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username]
      };
      this.pool.query(query, function (error, result) {
        if (error) {
          var err = new Error();
          return err;
        }
        if (result.rows.length < 1) {
          callback(error, result.rows);
        } else {
          callback(error, result.rows);
        }
      });
    }
  }, {
    key: 'insertQuestion',
    value: function insertQuestion(userId, questionTitle, questionContent, username, callback) {
      var query = 'INSERT INTO questions (userid, questiontitle, questioncontent, username) VALUES ($1, $2, $3, $4) RETURNING *';
      var values = [userId, questionTitle, questionContent, username];
      this.pool.query(query, values, function (err, result) {
        if (err) {
          var error = new Error();
          return error;
        }
        callback(err, result);
      });
    }
  }, {
    key: 'insertAnswer',
    value: function insertAnswer(userId, questionId, answer, answerNumber, username, callback) {
      var query = 'INSERT INTO answers (userid, questionid, answer, answernumber, accepted, upvotes, downvotes, username) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
      var values = [userId, questionId, answer, answerNumber, false, 0, 0, username];
      this.pool.query(query, values, function (err, result) {
        if (err) {
          var error = new Error();
          return error;
        }
        callback(err, result);
      });
    }
  }, {
    key: 'selectOneAnswer',
    value: function selectOneAnswer(questionId, answerId, callback) {
      var query = 'SELECT * FROM answers where answers.questionid = $1 and answers.answerid = $2';
      var values = [questionId, answerId];
      this.pool.query(query, values, function (error, result) {
        if (error) {
          var err = new Error();
          return err;
        }
        callback(error, result.rows[0]);
      });
    }
  }, {
    key: 'selectQuestions',
    value: function selectQuestions(callback) {
      var query = 'SELECT questions.questionid, questions.userid, questions.questiontitle, questions.questioncontent, questions.createdat, questions.username,\n    COUNT(answers.questionid) AS noOfAnswer FROM questions LEFT JOIN answers on (questions.questionid = answers.questionid)\n    GROUP BY questions.questionid';

      this.pool.query(query, function (err, result) {
        if (err) {
          callback('There was and Error getting questions', err);
        }
        callback(result.rows);
      });
    }
  }, {
    key: 'selectAnswer',
    value: function selectAnswer(table, questionId, callback) {
      var query = {
        name: 'fetch-answer',
        text: 'SELECT * FROM ' + table + ' WHERE answers.questionId = $1',
        values: [questionId]
      };

      this.pool.query(query, function (err, result) {
        if (err) {
          var error = new Error();
          return error;
        }
        callback(err, result);
      });
    }
  }, {
    key: 'selectMostAnswered',
    value: function selectMostAnswered(username, callback) {
      var query = 'SELECT questions.*, COUNT(answers.questionid) AS noOfAnswer FROM questions LEFT JOIN answers on (questions.questionid = answers.questionid) WHERE questions.username = $1 GROUP BY questions.questionid ORDER BY COUNT(answers.questionid) DESC';
      var values = [username];

      this.pool.query(query, values, function (error, mostAnswered) {
        callback(error, mostAnswered);
      });
    }
  }, {
    key: 'selectById',
    value: function selectById(table, userId, callback) {
      var query = {
        name: 'fetch-byid',
        text: 'SELECT * FROM ' + table + ' WHERE userid = $1',
        values: [userId]
      };

      this.pool.query(query, function (error, result) {
        if (error) {
          callback(error);
        } else {
          callback(result.rows[0]);
        }
      });
    }
  }, {
    key: 'selectByQuestionId',
    value: function selectByQuestionId(table, questionId, callback) {
      var query = 'SELECT * FROM ' + table + ' where questions.questionid = $1';
      var values = [Number(questionId)];
      this.pool.query(query, values, function (error, result) {
        callback(error, result.rows[0]);
      });
    }
  }, {
    key: 'searchAllQuestion',
    value: function searchAllQuestion(questionsQuery, callback) {
      var query = 'SELECT * FROM questions where questions.questiontitle ILIKE \'%' + questionsQuery + '%\' or questions.questioncontent ILIKE \'%' + questionsQuery + '%\'';

      this.pool.query(query, function (error, match) {
        callback(error, match.rows);
      });
    }
  }, {
    key: 'selectQuestionByUsername',
    value: function selectQuestionByUsername(username, callback) {
      var query = 'SELECT questions.*, COUNT(answers.questionid) AS noOfAnswer FROM questions LEFT JOIN answers on (questions.questionid = answers.questionid) WHERE questions.username = $1 GROUP BY questions.questionid';
      var value = [username];
      this.pool.query(query, value, function (error, result) {
        if (error) {
          var err = new Error();
          return err;
        }
        callback(error, result.rows);
      });
    }
  }, {
    key: 'selectQuestionAndAnswer',
    value: function selectQuestionAndAnswer(questionId, callback) {
      var query = 'SELECT answers.* FROM answers INNER JOIN questions ON answers.questionid = questions.questionid WHERE answers.questionId=$1';
      var value = [questionId];

      this.pool.query(query, value, function (error, result) {
        if (error) {
          var err = new Error();
          return err;
        }
        callback(error, result.rows);
      });
    }
  }, {
    key: 'updateQuestionAnswer',
    value: function updateQuestionAnswer(answerNumber, answer, questionId, callback) {
      var query = {
        name: 'update-answer',
        text: 'UPDATE answers SET answer = $1 WHERE answers.answernumber = $2 AND answers.questionid = $3 RETURNING *',
        values: [answer, answerNumber, questionId]
      };

      this.pool.query(query, function (error, result) {
        callback(error, result);
      });
    }
  }, {
    key: 'updateMarkedAnswer',
    value: function updateMarkedAnswer(answerNumber, callback) {
      var query = 'UPDATE answers SET accepted = true WHERE answers.answernumber = $1';
      var values = [answerNumber];
      this.pool.query(query, values, function (error, result) {
        if (error) {
          var err = new Error();
          return err;
        }
        callback(error, result);
      });
    }
  }, {
    key: 'insertUpvotes',
    value: function insertUpvotes(questionId, answerId, userId, username, callback) {
      var query = {
        name: 'insert-votes',
        text: 'INSERT INTO votes (upvotes, downvotes, questionid, userid, answerid, username) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        values: [1, 0, questionId, userId, answerId, username]
      };
      this.pool.query(query, function (error, upvote) {
        callback(error, upvote.rows);
      });
    }
  }, {
    key: 'insertDownvotes',
    value: function insertDownvotes(questionId, answerId, userId, username, callback) {
      var query = {
        name: 'insert-votes',
        text: 'INSERT INTO votes (upvotes, downvotes, questionid, userid, answerid, username) VALUES ($1, $2, $3, $4, $5, $6)',
        values: [0, 1, questionId, userId, answerId, username]
      };
      this.pool.query(query, function (error, downvote) {
        callback(error, downvote.rows);
      });
    }
  }, {
    key: 'insertComment',
    value: function insertComment(userId, questionId, answerId, comment, username, callback) {
      var query = 'INSERT INTO comments (userId, questionId, answerId, comment, username) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      var values = [userId, questionId, answerId, comment, username];

      this.pool.query(query, values, function (error, resComment) {
        callback(error, resComment.rows[0]);
      });
    }
  }, {
    key: 'selectComments',
    value: function selectComments(questionId, callback) {
      var query = 'SELECT * FROM comments WHERE comments.questionId=$1';
      var values = [questionId];
      this.pool.query(query, values, function (error, allComments) {
        callback(error, allComments.rows);
      });
    }
  }, {
    key: 'selectUpvotes',
    value: function selectUpvotes(questionId, answerId, callback) {
      var query = 'SELECT * FROM votes WHERE votes.questionid = $1 AND votes.answerid = $2 AND votes.upvotes = $3';
      var values = [questionId, answerId, 1];
      this.pool.query(query, values, function (error, allVotes) {
        callback(error, allVotes.rows);
      });
    }
  }, {
    key: 'selectDownvotes',
    value: function selectDownvotes(questionId, answerId, callback) {
      var query = 'SELECT * FROM votes WHERE votes.questionid = $1 AND votes.answerid = $2 AND votes.downvotes = $3';
      var values = [questionId, answerId, 1];
      this.pool.query(query, values, function (error, allDownvotes) {
        callback(error, allDownvotes.rows);
      });
    }
  }, {
    key: 'insertTotalNumberOfUpvotes',
    value: function insertTotalNumberOfUpvotes(questionId, answerId, totalUpvotes, callback) {
      var query = 'UPDATE answers SET upvotes = $1 WHERE answernumber = $2 AND questionid = $3 RETURNING *';
      var values = [totalUpvotes, answerId, questionId];

      this.pool.query(query, values, function (error, data) {
        callback(error, data.rows);
      });
    }
  }, {
    key: 'insertTotalNumberOfDownvotes',
    value: function insertTotalNumberOfDownvotes(questionId, answerId, totalDownvotes, callback) {
      var query = 'UPDATE answers SET downvotes = $1 WHERE answernumber = $2 AND questionid = $3 RETURNING *';
      var values = [totalDownvotes, answerId, questionId];

      this.pool.query(query, values, function (error, data) {
        callback(error, data.rows);
      });
    }
  }, {
    key: 'deleteQuestionById',
    value: function deleteQuestionById(table, questionId, callback) {
      var query = 'DELETE FROM ' + table + ' WHERE questionid = $1';
      var values = [questionId];
      this.pool.query(query, values, function (error, result) {
        if (error) {
          callback(error);
        } else {
          callback(result);
        }
      });
    }
  }]);

  return DbManager;
}();

exports.default = DbManager;
//# sourceMappingURL=DatabaseManager.js.map