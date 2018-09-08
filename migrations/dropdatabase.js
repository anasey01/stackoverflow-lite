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

const commentsQuery = 'DROP TABLE IF EXISTS comments';

const votesQuery = 'DROP TABLE IF EXISTS votes';

pool.query(votesQuery)
  .then((data) => {
    console.log('Votes Table Dropped');
    pool.query(commentsQuery)
      .then((data) => {
        console.log('Comments Table Dropped');
        pool.query(answersQuery)
          .then((data) => {
            console.log('Answers Table Dropped');
            pool.query(questionsQuery)
              .then((data) => {
                console.log('Questions Table Dropped');
                pool.query(usersQuery)
                  .then((data) => {
                    console.log('Users Table Dropped');
                  }).catch(err => console.log('Err creating Users table', err));
              }).catch(err => console.log('Error creating Questions table', err));
          }).catch(err => console.log('Error creating Answers table', err));
      }).catch(err => console.log('Error creating comments table', err));
  }).catch(err => console.log('Error creating Users votes', err));
