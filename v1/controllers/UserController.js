import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../model/dbConnections';
import dbQuery from '../model/dbQuery';

/**
 * @class { UserController}
 * @description { Handles user routes }
 */
class UserController {
  /**
     * @param { Object } request - Request Object - Get user data from request body
     * @param { Object } response - Response gotten from database
     */
  static signup(request, response) {
    const {
      fullname, gender, username, password, email,
    } = request.body;

    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    const hassedPassword = hashed;

    const values = [fullname, gender, username, hassedPassword, email];
    pool.query(dbQuery.registerUserQuery, values)
      .then((userData) => {
        const newUser = {
          user_id: userData.rows.user_id,
          username: userData.rows.username,
          email: userData.rows.email,
        };
        const token = jwt.sign({
          userId: newUser.user_id,
          username: newUser.username,
          email: newUser.email,
        }, process.env.PRIVATE_KEY, { expiresIn: '5h' });

        return response.header('x-auth-token', token).status(200).json({
          success: true,
          message: 'succesfully registered',
        });
      })
      .catch(error => response.status(409).json({
        success: false,
        message: 'User already exists',
        error: error.message,
      }));
  }

  /**
   *
   * @param {Object} request - Request Object - Get user information
   * @param {Object} response - Request Object - Return json response
   * @returns { json } Returns appopriate json responses.
   */
  static login(request, response) {
    const { username, password } = request.body;
    const values = [username];
    pool.query(dbQuery.selectUserByUsername, values)
      .then((userData) => {
        if (userData.rows.length === 0) {
          return response.status(400).json({
            success: false,
            message: 'unexisiting user! Please signup.',
          });
        }

        if (userData.rows.length === 1) {
          const currentUser = userData.rows[0];
          const storedHashedPassword = currentUser.password;
          const correctPassword = bcrypt.compareSync(password, storedHashedPassword);
          if (!correctPassword) {
            return response.status(400).json({
              success: false,
              message: 'username or password incorrect',
            });
          }
          const token = jwt.sign({
            userId: currentUser.user_id,
            username: currentUser.username,
          }, process.env.PRIVATE_KEY,
          { expiresIn: '5h' });
          return response.header('x-auth-token', token).status(200).json({
            success: true,
            message: 'Successfully logged in, Welcome back',
            username: currentUser.username,
            userId: currentUser.user_id,
            token,
          });
        }
      })
      .catch(error => response.status(500).json({
        success: false,
        message: 'Internal server Error! Unable to Login User',
        error: error.message,
      }));
  }
}

export default UserController;
