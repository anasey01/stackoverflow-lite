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
  username varchar(25) UNIQUE NOT NULL,
  password text NOT NULL,
  email varchar(150) UNIQUE NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);`;
const questionsQuery = `
CREATE TABLE IF NOT EXISTS questions(
  questionId SERIAL NOT NULL PRIMARY KEY,
  userId INTEGER REFERENCES users(userId) ON DELETE CASCADE,
  username varchar(25) REFERENCES users(username) ON DELETE CASCADE,
  questionTitle TEXT NOT NULL,
  questionContent TEXT NOT NULL,
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
  username varchar(25) REFERENCES users(username) ON DELETE CASCADE,
  answer TEXT NOT NULL,
  answerNumber INT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);`;
const commentsQuery = `
CREATE TABLE IF NOT EXISTS comments(
  commentId SERIAL NOT NULL PRIMARY KEY,
  comment TEXT NOT NULL,
  questionId INTEGER REFERENCES questions(questionId) ON DELETE CASCADE,
  userId INTEGER REFERENCES users(userId) ON DELETE CASCADE,
  answerId INTEGER REFERENCES answers(answerId) ON DELETE CASCADE,
  username varchar(25) REFERENCES users(username) ON DELETE CASCADE,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);`;
const votesQuery = `
CREATE TABLE IF NOT EXISTS votes(
  voteId SERIAL NOT NULL PRIMARY KEY,
  upvotes INTEGER NOT NULL,
  downvotes INTEGER NOT NULL,
  username varchar(25) REFERENCES users(username) ON DELETE CASCADE,
  questionId INTEGER REFERENCES questions(questionId) ON DELETE CASCADE,
  userId INTEGER REFERENCES users(userId) ON DELETE CASCADE,
  answerId INTEGER REFERENCES answers(answerId) ON DELETE CASCADE,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);`;

pool.query(usersQuery)
  .then((data) => {
    console.log('Users Table Created');
    pool.query(questionsQuery)
      .then((data) => {
        console.log('Questions Table Created');
        pool.query(answersQuery)
          .then((data) => {
            console.log('Answers Table Created');
            pool.query(commentsQuery)
              .then((data) => {
                console.log('comments Table Created');
                pool.query(votesQuery)
                  .then((data) => {
                    console.log('Votes table Created');
                  }).catch(err => console.log('Err creating votes table', err));
              }).catch(err => console.log('Error creating comments table', err));
          }).catch(err => console.log('Error creating Answers table', err));
      }).catch(err => console.log('Error creating Quesions table', err));
  }).catch(err => console.log('Error creating Users table', err));
