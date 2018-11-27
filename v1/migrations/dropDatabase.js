import { Pool } from 'pg';
import helper from '../helpers/helper';
import config from '../model/dbConfig';


let configString = '';
switch (process.env.NODE_ENV) {
  case 'test':
    configString = config.development;
    break;
  case 'production':
    configString = config.production;
    break;
  default:
    configString = config.development;
}

const query = 'DROP DATABASE IF EXISTS stackoverflowdb;';
// console.log(query);
const pool = new Pool(configString);

pool.query(query)
  .then(() => {
    pool.query('CREATE DATABASE stackoverflowdb;').then(() => helper.log('Database Dropped!'));
  })
  .catch(error => console.log('Error dropping database', error.message));
