import express from 'express';
import users from '../controllers/UsersRoute';

const authRouter = express.Router();


authRouter.post('/signup', users.signup);
authRouter.post('/login', users.login);

export default authRouter;

