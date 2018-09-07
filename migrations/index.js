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
  answerId SERIAL NOT NULL PRIMARY KEY,
  accepted BOOLEAN NOT NULL,
  upvotes INT NOT NULL,
  downvotes INT NOT NULL,
  questionId INTEGER REFERENCES questions(questionId) ON DELETE CASCADE,
  userId INTEGER REFERENCES users(userId) ON DELETE CASCADE,
  answer varchar(500) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);`;

const commentsQuery = `DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
  commentId SERIAL NOT NULL PRIMARY KEY,
  comment varchar(250) NOT NULL,
  questionId INTEGER REFERENCES questions(questionId) ON DELETE CASCADE,
  userId INTEGER REFERENCES users(userId) ON DELETE CASCADE,
  answerId INTEGER REFERENCES answers(answerId) ON DELETE CASCADE,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);`;

pool.query(usersQuery)
  .then((data) => {
    console.log('Users Table Created')
    pool.query(questionsQuery)
      .then((data) => {
        console.log('Questions Table Created')
        pool.query(answersQuery)
          .then((data) => {
            console.log('Answers Table Created');
            pool.query(commentsQuery)
              .then((data) => {
                console.log('comments Table Created');
              })
              .catch(err => console.log('Error creating comments table', err));
          })
          .catch(err => console.log('Error creating Answers table', err));
      })
      .catch(err => console.log('Error creating Quesions table', err));
  })
  .catch(err => console.log('Error creating Users table', err));
