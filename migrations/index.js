import { Pool } from 'pg';
import config from '../model/dbConfig';

let configString = '';
if (process.env.NODE_ENV) {
  if (process.env.NODE_ENV.trim() === 'test') configString = config.test;
  if (process.env.NODE_ENV.trim() === 'production') configString = config.production;
}
const pool = new Pool(configString || config.development);

const usersQuery = `DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  userId SERIAL NOT NULL PRIMARY KEY,
  fullname text NOT NULL,
  gender varchar(1) NOT NULL,
  username varchar(10) UNIQUE NOT NULL,
  password text NOT NULL,
  email varchar(60) UNIQUE NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);`;

const questionsQuery = `DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
  questionId SERIAL NOT NULL PRIMARY KEY,
  userId INTEGER REFERENCES users(userId) ON DELETE CASCADE,
  questionTitle varchar(100) NOT NULL,
  questionContent varchar(500) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);`;

const answersQuery = `DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers (
  answerId  SERIAL NOT NULL PRIMARY KEY,
  questionId INTEGER REFERENCES questions(questionId) ON DELETE CASCADE,
  userId INTEGER REFERENCES users(userId) ON DELETE CASCADE,
  answer varchar(500) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);`;

pool.query(usersQuery)
  .then((data) => {
    console.log('User Table Created');
    pool.query(questionsQuery)
      .then((data) => {
        console.log('Questions Table Created');
        pool.query(answersQuery)
          .then(data => console.log('Answers Table Created'))
          .catch((err) => {
            console.log('Error creating Answers Table', err);
          });
      }).catch((err) => {
        console.log('Error creating Questions Table', err);
      });
  }).catch((err) => {
    console.log('Error creating Users Table', err);
  });
