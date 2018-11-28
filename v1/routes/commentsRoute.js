import express from 'express';
import validateToken from '../middlewares/validateToken';
import validateInput from '../middlewares/userInputValidation';
import answerController from '../controllers/AnswerController';
import questionController from '../controllers/QuestionController';
import commentController from '../controllers/CommentController';

const commentRoute = express.Router();

commentRoute.post('/questions/:id/answers/:answerNumber/comment', validateToken, validateInput.addCommentToQuestion, questionController.validateQuestionExistence, answerController.validateAnswerExistence, commentController.addCommentToAnswer);
commentRoute.all('*', commentController.notFound);

export default commentRoute;
