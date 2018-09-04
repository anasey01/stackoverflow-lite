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

      var usersQuery = '\n    CREATE TABLE IF NOT EXISTS users(\n        id SERIAL NOT NULL PRIMARY KEY,\n        fullname text NOT NULL,\n        gender text NOT NULL,\n        username text UNIQUE NOT NULL,\n        password text NOT NULL,\n        email text UNIQUE NOT NULL,\n        created_at TIMESTAMP NOT NULL DEFAULT NOW()\n    );';

      var questionsQuery = '\n    CREATE TABLE IF NOT EXISTS questions(\n        id SERIAL NOT NULL PRIMARY KEY,\n        user_id INTEGER REFERENCES users(id),\n        title text NOT NULL,\n        content text NOT NULL,\n        created_at TIMESTAMP NOT NULL DEFAULT NOW()\n    );';

      var answersQuery = '\n    CREATE TABLE IF NOT EXISTS answers(\n        id SERIAL NOT NULL PRIMARY KEY,\n        user_id integer REFERENCES users(id),\n        question_id INTEGER REFERENCES questions(id),\n        created_at TIMESTAMP NOT NULL DEFAULT NOW(),\n        answer text NOT NULL\n    );';

      this.pool.query(usersQuery).then(function (data) {
        _this.pool.query(questionsQuery).then(function (data) {
          _this.pool.query(answersQuery).then(function (data) {
            return null;
          }).catch(function (err) {
            return err;
          });
        }).catch(function (err) {
          return err;
        });
      }).catch(function (err) {
        return err;
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
          throw error;
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
          throw error;
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
    value: function insertQuestion(userId, title, content, callback) {
      var query = 'INSERT INTO questions (user_id, title, content) VALUES ($1, $2, $3)';
      var values = [userId, title, content];
      this.pool.query(query, values, function (err, result) {
        callback(err, result);
      });
    }
  }, {
    key: 'insertAnswer',
    value: function insertAnswer(userId, questionId, answer, callback) {
      var query = 'INSERT INTO answers (user_id, question_id, answer) VALUES ($1, $2, $3)';
      var values = [userId, Number(questionId), answer];
      this.pool.query(query, values, function (err, result) {
        callback(err, result);
      });
    }
  }, {
    key: 'selectQuestions',
    value: function selectQuestions(callback) {
      var query = 'SELECT * FROM questions';
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
        text: 'SELECT * FROM ' + table + ' WHERE answers.question_id = $1',
        values: [Number(questionId)]
      };

      this.pool.query(query, function (err, result) {
        callback(err, result);
      });
    }
  }, {
    key: 'selectById',
    value: function selectById(table, id, callback) {
      var query = {
        name: 'fetch-byid',
        text: 'SELECT * FROM ' + table + ' WHERE id = $1',
        values: [id]
      };

      this.pool.query(query, function (error, result) {
        if (error) {
          callback(error);
        } else {
          callback(result.rows[0]);
        }
      });
    }
  }]);

  return DbManager;
}();

exports.default = DbManager;
//# sourceMappingURL=DatabaseManager.js.map