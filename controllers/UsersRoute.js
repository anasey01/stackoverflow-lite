import jwt from 'jsonwebtoken';
import UserManager from './UserManager';
import DatabaseManager from '../net/DatabaseManager';

const db = new DatabaseManager();
const userManager = new UserManager(db);

const UsersRoutes = {
  login(req, res) {
    userManager.login(req.body.username, req.body.password, (result) => {
      if (!result[0].id) {
        return res.status(401).json({
          success: false,
          message: 'username or password incorrect',
        });
      }
      const token = jwt.sign(
        {
          _id: result[0].id,
          name: result[0].fullname,
          gender: result[0].gender,
          username: result[0].username,
          email: result[0].email,
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
        res.status(401).json({
          success: false,
          message: 'username already exists',
        });
      } else {
        const token = jwt.sign({
          fullname: result.fullname,
          gender: result.gender,
          username: result.username,
          email: result.email,
        }, process.env.PRIVATE_KEY);
        res.header('x-auth-token', token).status(200).json({
          success: true,
          message: 'user succesfully registered',
        });
      }
    });
  },
};

export default UsersRoutes;
