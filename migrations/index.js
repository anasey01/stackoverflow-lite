import { Pool } from 'pg';
import config from '../model/dbConfig';

let configString = '';
if (process.env.NODE_ENV) {
  if (process.env.NODE_ENV.trim() === 'test') configString = config.test;
  if (process.env.NODE_ENV.trim() === 'production') configString = config.production;
}
const pool = new Pool(configString || config.development);

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
        userId INTEGER REFERENCES users(userId),
        questionTitle varchar(100) NOT NULL,
        questionContent varchar(500) NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT NOW()
    );`;

const answersQuery = `
    CREATE TABLE IF NOT EXISTS answers(
        answerId  SERIAL NOT NULL PRIMARY KEY,
        questionId INTEGER REFERENCES questions(questionId),
        userId INTEGER REFERENCES users(userId),
        answer varchar(500) NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT NOW()
    );`;

pool.query(usersQuery)
  .then((data) => {
    pool.query(questionsQuery)
      .then((data) => {
        pool.query(answersQuery)
          .then(data => console.log('All Tables created')).catch(err => err);
      }).catch(err => err);
  }).catch(err => err);
