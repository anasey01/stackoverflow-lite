import express from 'express';
import validateToken from '../middleware/validateToken';
import Votes from '../controllers/Votes';

const router = express.Router();

router.put('/questions/:questionId/answers/:answerId/upvote', validateToken, Votes.upvote);
router.put('/questions/:questionId/answers/:answerId/downvote', validateToken, Votes.downvote);

export default router;

