import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../model/dbConfig';
import helper from '../helpers/helper';
import dbQuery from '../model/dbQuery';

dotenv.config();

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

const pool = new Pool(configString);

pool.query(query)
  .then(() => helper.log('Database Tables Created'))
  .catch(error => helper.log('Error Creating Database', error.message));
