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
      userId SERIAL NOT NULL PRIMARY KEY,
      fullname text NOT NULL,
      gender varchar(1) NOT NULL,
      username varchar(10) UNIQUE NOT NULL,
      password text NOT NULL,
      email varchar(60) UNIQUE NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT NOW()
    );`;
    const questionsQuery = `
    CREATE TABLE IF NOT EXISTS questions(
      questionId SERIAL NOT NULL PRIMARY KEY,
      userId INTEGER REFERENCES users(userId) ON DELETE CASCADE,
      questionTitle varchar(100) NOT NULL,
      questionContent varchar(500) NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT NOW()
    );`;
    const answersQuery = `
    CREATE TABLE IF NOT EXISTS answers(
      answerId SERIAL NOT NULL PRIMARY KEY,
      accepted BOOLEAN NOT NULL,
      upvotes INT NOT NULL,
      downvotes INT NOT NULL,
      questionId INTEGER REFERENCES questions(questionId) ON DELETE CASCADE,
      userId INTEGER REFERENCES users(userId) ON DELETE CASCADE,
      answer varchar(500) NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT NOW()
    );`;
    const commentsQuery = `
    CREATE TABLE IF NOT EXISTS comments(
      commentId SERIAL NOT NULL PRIMARY KEY,
      comment varchar(250) NOT NULL,
      questionId INTEGER REFERENCES questions(questionId) ON DELETE CASCADE,
      userId INTEGER REFERENCES users(userId) ON DELETE CASCADE,
      answerId INTEGER REFERENCES answers(answerId) ON DELETE CASCADE,
      createdAt TIMESTAMP NOT NULL DEFAULT NOW()
    );`;
    const votesQuery = `
    CREATE TABLE IF NOT EXISTS votes(
      voteId SERIAL NOT NULL PRIMARY KEY,
      upvotes INTEGER NOT NULL,
      downvotes INTEGER NOT NULL,
      questionId INTEGER REFERENCES questions(questionId) ON DELETE CASCADE,
      userId INTEGER REFERENCES users(userId) ON DELETE CASCADE,
      answerId INTEGER REFERENCES answers(answerId) ON DELETE CASCADE,
      createdAt TIMESTAMP NOT NULL DEFAULT NOW()
    );`;

    this.pool.query(usersQuery)
      .then((data) => {
        console.log('Users Table Created');
        this.pool.query(questionsQuery)
          .then((data) => {
            console.log('Questions Table Created');
            this.pool.query(answersQuery)
              .then((data) => {
                console.log('Answers Table Created');
                this.pool.query(commentsQuery)
                  .then((data) => {
                    console.log('comments Table Created');
                    this.pool.query(votesQuery)
                      .then((data) => {
                        console.log('Votes table Created');
                      }).catch(err => console.log('Err creating votes table', err));
                  }).catch(err => console.log('Error creating comments table', err));
              }).catch(err => console.log('Error creating Answers table', err));
          }).catch(err => console.log('Error creating Quesions table', err));
      }).catch(err => console.log('Error creating Users table', err));
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
    const query = 'INSERT INTO answers (userid, questionid, answer, accepted, upvotes, downvotes) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [userId, questionId, answer, false, 0, 0];
    this.pool.query(query, values, (err, result) => {
      callback(err, result);
    });
  }

  selectOneAnswer(questionId, answerId, callback) {
    const query = 'SELECT * FROM answers where answers.questionid = $1 and answers.answerid = $2';
    const values = [questionId, answerId];
    this.pool.query(query, values, (error, result) => {
      callback(error, result.rows[0]);
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

  selectQuestionByUserId(userId, callback) {
    const query = 'SELECT * FROM questions WHERE userid =$1';
    const value = [userId];

    this.pool.query(query, value, (error, result) => {
      callback(error, result.rows);
    });
  }

  updateQuestionAnswer(answerId, answer, callback) {
    const query = {
      name: 'update-answer',
      text: 'UPDATE answers SET answer = $1 WHERE answers.answerid = $2',
      values: [answer, answerId],
    };

    this.pool.query(query, (error, result) => {
      callback(error, result);
    });
  }

  updateMarkedAnswer(answerId, callback) {
    const query = 'UPDATE answers SET accepted = true WHERE answers.answerid = $1';
    const values = [answerId];

    this.pool.query(query, values, (error, result) => {
      callback(error, result);
    });
  }

  insertVotes(questionId, answerId, userId, currentVote, otherVote, callback) {
    const query = {
      name: 'insert-votes',
      text: `INSERT INTO votes (${currentVote}, ${otherVote}, questionid, userid, answerid) VALUES ($1, $2, $3, $4, $5)`,
      values: [1, 0, questionId, userId, answerId],
    };
    this.pool.query(query, (error, result) => {
      if (error) throw error;
      if (result.rowCount === 1) {
        const selectQuery = 'SELECT * FROM votes WHERE answerid = $1';
        const selectValue = [answerId];
        this.pool.query(selectQuery, selectValue, (error, result) => {
          callback(error, result.rows);
        });
      }
    });
  }

  deleteQuestionById(table, questionId, callback) {
    const query = `DELETE FROM ${table} WHERE questionid = $1`;
    const values = [questionId];

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
