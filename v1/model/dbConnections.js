import { Pool } from 'pg';
import config from './dbConfig';
import dbQuery from './dbQuery';
import helper from '../helpers/helper';

let configString = '';
switch (process.env.NODE_ENV) {
  case 'test':
    configString = config.test;
    break;
  case 'production':
    configString = config.production;
    break;
  default:
    configString = config.development;
}

const query = `
${dbQuery.userTableQuery}
${dbQuery.questionTableQuery}
${dbQuery.answerTableQuery}
${dbQuery.commentTableQuery}
${dbQuery.votesTableQuery}
`;

console.log(configString)

const pool = new Pool(configString);

pool.query(query)
  .then(() => {
    helper.log('Database Tables Created');
  })
  .catch((error) => {
    console.log(error);
    helper.log('Error Creating Database', error.message);
  });

export default pool;
