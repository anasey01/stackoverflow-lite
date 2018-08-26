import bcrypt from 'bcrypt';

class Authentication {
  constructor(connection) {
    this.conn = connection;
    this.table = 'users';
  }

  registerUser(fullname, gender, username, password, email, callback) {
    this.conn.selectUserByUsername(username, (err, result) => {
      if (err) {
        callback(err);
      } else if (result.length < 1 && result.length !== 1) {
        this.createUser(fullname, gender, username, password, email, callback);
      } else {
        callback('existing');
      }
    });
  }

  createUser(fullname, gender, username, password, email, callback) {
    this.conn.insertUser(fullname, gender, username, password, email, (err, result) => {
      if (err) {
        callback('There was an error adding user!');
      }
      callback(`Welcome ${fullname}`);
    });
  }

  login(username, password, callback) {
    this.conn.selectUserByUsername(username, (err, result) => {
      if (result.length < 1) {
        callback('username or password incorrect');
      } else {
        const userData = result;
        const storedHashedPassword = userData[0].password;
        const correctPassword = bcrypt.compareSync(password, storedHashedPassword);
        if (typeof result !== 'object' || !correctPassword) {
          callback('Username or Password incorrect');
        } else {
          callback(result);
        }
      }
    });
  }
}
export default Authentication;
