'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _dbConfig = require('./dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = new _pg2.default.Pool(_dbConfig2.default);

var dbManager = {
  createUserTable: function createUserTable() {
    var query = '\n                CREATE TABLE IF NOT EXISTS users(\n                    id serial integer NOT NULL PRIMARY KEY,\n                    fullname text NOT NULL,\n                    username text NOT NULL,\n                    password text NOT NULL,\n                    gender text NOT NULL\n                )';
    return pool.connect(function (err, client, done) {
      if (err) {
        throw err;
      }
      done();
      client.query(query, function (er, result) {
        if (er) throw er;
        return result;
      });
    });
  },
  insertUser: function insertUser(fullname, username, gender, password, email) {
    var query = 'INSERT INTO users(' + fullname + ', ' + username + ',' + gender + ',' + password + ',' + email + ') VALUES(?,?,?,?,?)';
    pool.connect(function (err, client, done) {
      if (err) {
        throw err;
      }
      client.query(query, function (error, result) {
        done();
        if (error) {
          throw err;
        }
        return result;
      });
      done();
    });
  },
  selectUserByEmail: function selectUserByEmail(email, callback) {
    var query = 'SELECT email FROM users';
    pool.connect(function (err, client, done) {
      if (err) {
        throw err;
      }
      client.query(query, function (error, result) {
        done();
        if (error) {
          throw err;
        }
        result.rows.forEach(function (item) {
          var currentEmail = item.email;
          if (currentEmail === email) {
            return callback(currentEmail);
          }
          return false;
        });
        done();
      });
    });
  },
  selectAll: function selectAll(table) {
    pool.connect(function (err, client, done) {
      if (err) {
        throw err;
      }
      // release user back to the pool
      done();
      var query = 'SELECT * FROM ' + table;
      client.query(query, function (er, result) {
        if (er) throw er;
        done();
        return result;
      });
    });
  }
};

exports.default = dbManager;
//# sourceMappingURL=dbManager.js.map