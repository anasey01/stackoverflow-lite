import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import users from '../controllers/UsersRoute';
import validateToken from '../middleware/validateToken';

const authRouter = express.Router();

authRouter.use(bodyParser.urlencoded({ extended: false }));
authRouter.use(bodyParser.json());
authRouter.use(morgan(':method :url :response-time'));

authRouter.post('/signup', users.signup);
authRouter.post('/login', users.login);

export default authRouter;
