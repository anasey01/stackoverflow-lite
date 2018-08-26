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

var dbManager = function () {
  function dbManager() {
    _classCallCheck(this, dbManager);

    this.pool = new _pg.Pool(_dbConfig2.default);
    this.createUserTable();
  }

  _createClass(dbManager, [{
    key: 'createUserTable',
    value: function createUserTable() {
      var query = '\n    CREATE TABLE IF NOT EXISTS users(\n        id SERIAL NOT NULL PRIMARY KEY,\n        fullname text NOT NULL,\n        gender text NOT NULL,\n        username text NOT NULL,\n        password text NOT NULL,\n        email text NOT NULL\n    );';
      return this.pool.query(query, function (err, result) {
        return result;
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
  }]);

  return dbManager;
}();

exports.default = dbManager;
//# sourceMappingURL=DatabaseManager.js.map