import express from 'express';
import validateToken from '../middleware/validateToken';
import Votes from '../controllers/Votes';

const voteRouter = express.Router();

voteRouter.get('/questions/:questionId/answers/:answerId/upvote', validateToken, Votes.getAllVotes);
voteRouter.get('/questions/:questionId/answers/:answerId/downvote', validateToken, Votes.getAllVotes);
voteRouter.post('/questions/:questionId/answers/:answerId/upvote', validateToken, Votes.upvote);
voteRouter.post('/questions/:questionId/answers/:answerId/downvote', validateToken, Votes.downvote);

export default voteRouter;
