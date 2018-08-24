import pg from 'pg';
import config from './dbConfig';

const pool = new pg.Pool(config);

const dbManager = {
  createUserTable() {
    const query = `
                CREATE TABLE IF NOT EXISTS users(
                    id serial integer NOT NULL PRIMARY KEY,
                    fullname text NOT NULL,
                    username text NOT NULL,
                    password text NOT NULL,
                    gender text NOT NULL
                )`;
    return pool.connect((err, client, done) => {
      if (err) {
        throw err;
      }
      done();
      client.query(query, (er, result) => {
        if (er) throw er;
        return result;
      });
    });
  },
  insertUser(fullname, username, gender, password, email) {
    const query = `INSERT INTO users(${fullname}, ${username},${gender},${password},${email}) VALUES(?,?,?,?,?)`;
    pool.connect((err, client, done) => {
      if (err) {
        throw err;
      }
      client.query(query, (error, result) => {
        done();
        if (error) {
          throw err;
        }
        return result;
      });
      done();
    });
  },

  selectUserByEmail(email, callback) {
    const query = 'SELECT email FROM users';
    pool.connect((err, client, done) => {
      if (err) {
        throw err;
      }
      client.query(query, (error, result) => {
        done();
        if (error) {
          throw err;
        }
        result.rows.forEach((item) => {
          const currentEmail = item.email;
          if (currentEmail === email) {
            return callback(currentEmail);
          }
          return false;
        });
        done();
      });
    });
  },

  selectAll(table) {
    pool.connect((err, client, done) => {
      if (err) {
        throw err;
      }
      // release user back to the pool
      done();
      const query = `SELECT * FROM ${table}`;
      client.query(query, (er, result) => {
        if (er) throw er;
        done();
        return result;
      });
    });
  },

};

export default dbManager;
