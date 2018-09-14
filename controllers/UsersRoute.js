import jwt from 'jsonwebtoken';
import UserManager from './UserManager';
import DatabaseManager from '../net/DatabaseManager';

const db = new DatabaseManager();
const userManager = new UserManager(db);

const UsersRoutes = {
  login(req, res) {
    const { username, password } = req.body;
    userManager.login(username, password, (result) => {
      if (!result[0].userid) {
        return res.status(401).json({
          success: false,
          message: 'username or password incorrect',
        });
      }
      const token = jwt.sign(
        {
          userId: result[0].userid,
          username: result[0].username,
        }, process.env.PRIVATE_KEY,
      );
      return res.header('x-auth-token', token).status(200).json({
        success: true,
        message: 'Successfully logged in',
        token,
      });
    });
  },

  signup(req, res) {
    const {
      fullname, gender, username, password, email,
    } = req.body;
    userManager.registerUser(fullname, gender, username, password, email, (result) => {
      if (result === 'existing') {
        return res.status(401).json({
          success: false,
          message: 'username or email exists',
        });
      }
      const token = jwt.sign({
        username: result.username,
        email: result.email,
      }, process.env.PRIVATE_KEY);
      return res.header('x-auth-token', token).status(200).json({
        success: true,
        message: 'user succesfully registered',
      });
    });
  },
};

export default UsersRoutes;
