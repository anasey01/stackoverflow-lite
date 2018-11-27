import express from 'express';
import validateToken from '../middlewares/validateToken';
import validateInput from '../middlewares/userInputValidation';
import answerController from '../controllers/AnswerController';
import questionController from '../controllers/QuestionController';
import voteController from '../controllers/VoteController';

const voteRoute = express.Router();

voteRoute.post('/questions/:id/answers/:answerNumber/upvote', validateToken, validateInput.getSpecificQuestion, validateInput.getSpecificAnswer, questionController.validateQuestionExistence, answerController.validateAnswerExistence, voteController.restrictVoteFromAnswerAuthor, voteController.upvoteAnswer, voteController.countTotalUpvotes, voteController.saveCurrentTotalUpvoteToAnswer);
voteRoute.post('/questions/:id/answers/:answerNumber/downvote', validateToken, validateInput.getSpecificQuestion, validateInput.getSpecificAnswer, questionController.validateQuestionExistence, answerController.validateAnswerExistence, voteController.restrictVoteFromAnswerAuthor, voteController.downvoteAnswer, voteController.countTotalDownvotes, voteController.saveCurrentTotalDownvoteToAnswer);

export default voteRoute;
