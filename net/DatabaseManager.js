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
    this.createAllTables();
  }

  createAllTables() {
    const usersQuery = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL NOT NULL PRIMARY KEY,
        fullname text NOT NULL,
        gender text NOT NULL,
        username text UNIQUE NOT NULL,
        password text NOT NULL,
        email text UNIQUE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );`;

    const questionsQuery = `
    CREATE TABLE IF NOT EXISTS questions(
        id SERIAL NOT NULL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        title text NOT NULL,
        content text NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );`;

    const answersQuery = `
    CREATE TABLE IF NOT EXISTS answers(
        id SERIAL NOT NULL PRIMARY KEY,
        user_id integer REFERENCES users(id),
        question_id INTEGER REFERENCES questions(id),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        answer text NOT NULL
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

  insertQuestion(userId, title, content, callback) {
    const query = 'INSERT INTO questions (user_id, title, content) VALUES ($1, $2, $3)';
    const values = [userId, title, content];
    this.pool.query(query, values, (err, result) => {
      callback(err, result);
    });
  }

  insertAnswer(userId, questionId, answer, callback) {
    const query = 'INSERT INTO answers (user_id, question_id, answer) VALUES ($1, $2, $3)';
    const values = [userId, Number(questionId), answer];
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
      text: `SELECT * FROM ${table} WHERE answers.question_id = $1`,
      values: [Number(questionId)],
    };

    this.pool.query(query, (err, result) => {
      callback(err, result);
    });
  }

  selectById(table, id, callback) {
    const query = {
      name: 'fetch-byid',
      text: `SELECT * FROM ${table} WHERE id = $1`,
      values: [id],
    };

    this.pool.query(query, (error, result) => {
      if (error) {
        callback(error);
      } else {
        callback(result.rows[0]);
      }
    });
  }
}

export default DbManager;
