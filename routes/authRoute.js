import express from 'express';
import validateLogin from '../middleware/validateLogin';
import validateSignup from '../middleware/validateSignup';
import users from '../controllers/UsersRoute';

const authRouter = express.Router();


authRouter.post('/signup', validateSignup, users.signup);
authRouter.post('/login', validateLogin, users.login);

export default authRouter;
