import { Pool } from 'pg';
import config from '../model/dbConfig';

let configString = '';
if (process.env.NODE_ENV) {
  if (process.env.NODE_ENV.trim() === 'test') configString = config.test;
  if (process.env.NODE_ENV.trim() === 'production') configString = config.production;
}
const pool = new Pool(configString || config.development);

const answersQuery = `
CREATE TABLE IF NOT EXISTS answers(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id integer REFERENCES users(id),
    question_id INTEGER REFERENCES questions(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    answer text NOT NULL
);`;

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


pool.query(usersQuery)
  .then((data) =>{
    console.log('User Database Created');
    pool.query(questionsQuery)
      .then((data) => {
        console.log('Question Database Created');
        pool.query(answersQuery)
          .then((data) => {
            console.log('Answer Database created');
            return null;
          }).catch(err => console.log(err));
      }).catch(err => console.log(err));
  }).catch(err => console.log(err));
