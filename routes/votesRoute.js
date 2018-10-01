import express from 'express';
import validateToken from '../middleware/validateToken';
import Votes from '../controllers/Votes';

const voteRouter = express.Router();

voteRouter.post('/questions/:questionId/answers/:answerId/upvote', validateToken, Votes.upvote, Votes.getTotalUpvotes, Votes.saveUpvotes);
voteRouter.post('/questions/:questionId/answers/:answerId/downvote', validateToken, Votes.downvote, Votes.getTotalDownvotes, Votes.saveDownvotes);

export default voteRouter;
