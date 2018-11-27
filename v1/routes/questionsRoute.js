import express from 'express';
import validateToken from '../middlewares/validateToken';
import validateInput from '../middlewares/userInputValidation';
import questionController from '../controllers/QuestionController';
import answerController from '../controllers/AnswerController';

const questionRoute = express.Router();

questionRoute.get('/questions', questionController.getAllQuestion);
questionRoute.get('/questions/:id', validateToken, validateInput.getSpecificQuestion, answerController.retrieveAnswerForSpecificQuestion, questionController.getSpecificQuestion);
questionRoute.post('/questions', validateToken, validateInput.postQuestion, questionController.postQuestion);
questionRoute.delete('/question/:id', validateToken, validateInput.getSpecificQuestion, questionController.validateQuestionExistence, questionController.validateQuestionAuthor, questionController.deleteQuestion);

export default questionRoute;
