import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import config from '../model/dbConfig';

class DbManager {
  constructor() {
    let configString = '';
    if (process.env.NODE_ENV) {
      if (process.env.NODE_ENV.trim() === 'test') configString = config.test;
      if (process.env.NODE_ENV.trim() === 'production') configString = config.production;
    }
    this.pool = new Pool(configString || config.development);
  }

  createAllTables() {
    const usersQuery = `
    CREATE TABLE IF NOT EXISTS users CASCADE(
      userId SERIAL NOT NULL PRIMARY KEY,
      fullname text NOT NULL,
      gender varchar(1) NOT NULL,
      username varchar(10) UNIQUE NOT NULL,
      password text NOT NULL,
      email varchar(60) UNIQUE NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT NOW()
    );`;

    const questionsQuery = `
    CREATE TABLE IF NOT EXISTS questions CASCADE(
      questionId SERIAL NOT NULL PRIMARY KEY,
      userId INTEGER REFERENCES users(userId),
      questionTitle varchar(100) NOT NULL,
      questionContent varchar(500) NOT NULL ON DELETE CASCADE,
      createdAt TIMESTAMP NOT NULL DEFAULT NOW()
    );`;

    const answersQuery = `
    CREATE TABLE IF NOT EXISTS answers CASCADE(
      answerId  SERIAL NOT NULL PRIMARY KEY),
      questionId INTEGER REFERENCES questions(questionId) ON DELETE CASCADE,
      userId INTEGER REFERENCES users(userId) ON DELETE CASCADE,
      answer varchar(500) NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT NOW()
    );`;

    this.pool.query(usersQuery)
      .then((data) => {
        this.pool.query(questionsQuery)
          .then((data) => {
            this.pool.query(answersQuery)
              .then(data => null).catch(err => err);
          }).catch(err => err);
      }).catch(err => err);
  }

  insertUser(fullname, gender, username, password, email, callback) {
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    password = hashed;
    const query = 'INSERT INTO users (fullname, gender, username, password, email) VALUES($1, $2, $3, $4, $5);';
    const values = [fullname, gender, username, password, email];
    this.pool.query(query, values, (error, result) => {
      if (error) {
        throw error;
      }
      callback(error, result);
    });
  }

  selectUserByUsername(username, callback) {
    const query = {
      name: 'fetch-username',
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    };
    this.pool.query(query, (error, result) => {
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

  insertQuestion(userId, questionTitle, questionContent, callback) {
    const query = 'INSERT INTO questions (userid, questiontitle, questioncontent) VALUES ($1, $2, $3)';
    const values = [userId, questionTitle, questionContent];
    this.pool.query(query, values, (err, result) => {
      callback(err, result);
    });
  }

  insertAnswer(userId, questionId, answer, callback) {
    const query = 'INSERT INTO answers (userid, questionid, answer) VALUES ($1, $2, $3)';
    const values = [userId, questionId, answer];
    this.pool.query(query, values, (err, result) => {
      callback(err, result);
    });
  }

  selectQuestions(callback) {
    const query = 'SELECT * FROM questions';
    this.pool.query(query, (err, result) => {
      if (err) {
        callback('There was and Error getting questions', err);
      }
      callback(result.rows);
    });
  }

  selectAnswer(table, questionId, callback) {
    const query = {
      name: 'fetch-answer',
      text: `SELECT * FROM ${table} WHERE answers.questionId = $1`,
      values: [questionId],
    };

    this.pool.query(query, (err, result) => {
      callback(err, result);
    });
  }

  selectById(table, userId, callback) {
    const query = {
      name: 'fetch-byid',
      text: `SELECT * FROM ${table} WHERE userid = $1`,
      values: [userId],
    };

    this.pool.query(query, (error, result) => {
      if (error) {
        callback(error);
      } else {
        callback(result.rows[0]);
      }
    });
  }

  selectByQuestionId(table, questionId, callback) {
    const query = {
      name: 'fetch-by-questionid',
      text: `SELECT * FROM ${table} WHERE questionid = $1`,
      values: [questionId],
    };
    this.pool.query(query, (error, result) => {
      if (error) {
        callback(error);
      } else {
        callback(result.rows[0]);
      }
    });
  }

  deleteQuestionById(table, questionId, callback) {
    const query = `DELETE FROM ${table} WHERE questionid = $1`;
    const values = [questionId];

    console.log(query);
    this.pool.query(query, values, (error, result) => {
      if (error) {
        callback(error);
      } else {
        callback(result);
      }
    });
  }
}

export default DbManager;
