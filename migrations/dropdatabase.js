import { Pool } from 'pg';
import config from '../model/dbConfig';

let configString = '';
if (process.env.NODE_ENV) {
  if (process.env.NODE_ENV.trim() === 'test') configString = config.test;
  if (process.env.NODE_ENV.trim() === 'production') configString = config.production;
}
const pool = new Pool(configString || config.development);

const answersQuery = 'DROP TABLE IF EXISTS answers';

const usersQuery = 'DROP TABLE IF EXISTS users';

const questionsQuery = 'DROP TABLE IF EXISTS questions';


pool.query(answersQuery)
  .then((data) => {
    console.log('Answer Table Dropped!');
    pool.query(questionsQuery)
      .then((data) => {
        console.log('Questions Table Dropped!');
        pool.query(usersQuery)
          .then(data => console.log('User Table Dropped'))
          .catch((err) => {
            console.log('Error creating User Table', err);
          });
      }).catch((err) => {
        console.log('Error creating Questions Table', err);
      });
  }).catch((err) => {
    console.log('Error creating Answers Table', err);
  });