import express from 'express';
import validateToken from '../middlewares/validateToken';
import validateInput from '../middlewares/userInputValidation';
import answerController from '../controllers/AnswerController';
import questionController from '../controllers/QuestionController';

const answersRoute = express.Router();

answersRoute.post('/questions/:id/answers',
  validateToken,
  validateInput.getSpecificQuestion,
  questionController.validateQuestionExistence,
  answerController.restrictQuestionAuthorFromAnswering,
  answerController.calculateNumberOfAnswers,
  answerController.addAnswerToQuestion);

answersRoute.put('/questions/:id/answers/:answerNumber',
  validateToken,
  validateInput.getSpecificQuestion,
  validateInput.getSpecificAnswer,
  questionController.validateQuestionExistence,
  answerController.validateAnswerExistence,
  answerController.validateAnswerAuthor,
  answerController.updateAnswerToQuestion);

export default answersRoute;
