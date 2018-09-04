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
    pool.query(questionsQuery)
      .then((data) => {
        pool.query(usersQuery)
          .then(data => console.log('All Tables Dropped!')).catch(err => err);
      }).catch(err => err);
  }).catch(err => err);
