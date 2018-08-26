import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import config from '../model/dbConfig';

class dbManager {
  constructor() {
    this.pool = new Pool(config);
    this.createUserTable();
  }

  createUserTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL NOT NULL PRIMARY KEY,
        fullname text NOT NULL,
        gender text NOT NULL,
        username text NOT NULL,
        password text NOT NULL,
        email text NOT NULL
    );`;
    return this.pool.query(query, (err, result) => result);
  }

  insertUser(fullname, gender, username, password, email, callback) {
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    password = hashed;
    const query = 'INSERT INTO users (fullname, gender, username, password, email) VALUES($1, $2, $3, $4, $5);';
    const values = [fullname, gender, username, password, email];
    this.pool.query(query, values, (error, result) => {
      if (error) {
        throw error;
      }
      callback(error, result);
    });
  }

  selectUserByUsername(username, callback) {
    const query = {
      name: 'fetch-username',
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    };
    this.pool.query(query, (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rows.length < 1) {
        callback(error, result.rows);
      } else {
        callback(error, result.rows);
      }
    });
  }
}

export default dbManager;
