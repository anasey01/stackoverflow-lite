import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import Authentication from '../auth/Authentication';
import DatabaseManager from '../controllers/DatabaseManager';

const db = new DatabaseManager();
const auth = new Authentication(db);

const authRouter = express.Router();
authRouter.use(bodyParser.urlencoded({ extended: false }));
authRouter.use(bodyParser.json());
authRouter.use(morgan(':method :url :response-time'));

authRouter.get('/signup', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to signup API route',
  });
});

authRouter.post('/signup', (req, res) => {
  const obj = req.body;
  auth.registerUser(obj.fullname, obj.gender, obj.username, obj.password, obj.email, (result) => {
    if (result === 'existing') {
      res.status(400).json({
        success: false,
        message: 'username already exists',
      });
    } else {
      res.status(200).json({
        status: true,
        message: 'user succesfully registered',
      });
    }
  });
});

authRouter.post('/login', (req, res) => {
  const obj = req.body;
  auth.login(obj.username, obj.password, (result) => {
    const token = jwt.sign(
      {
        _id: result.id,
        name: result.fullname,
        gender: result.gender,
        username: result.username,
        email: result.email,
      }, 'jwtPrivateKey',
    );
    res.json(token);
  });
});

export default authRouter;
