import express from 'express';
import validateInput from '../middlewares/userInputValidation';
import userController from '../controllers/UserController';

const userRouter = express.Router();

userRouter.post('/signup', validateInput.signup, userController.signup);
userRouter.post('/login', validateInput.login, userController.login);

export default userRouter;
