import express from 'express';
import inputValidation from '../middleware/inputValidation';
import users from '../controllers/UsersRoute';

const authRouter = express.Router();


authRouter.post('/signup', inputValidation.signup, users.signup);
authRouter.post('/login', inputValidation.login, users.login);

export default authRouter;
