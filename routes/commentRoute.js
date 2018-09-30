import express from 'express';
import validateToken from '../middleware/validateToken';
import comment from '../controllers/Comments';

const router = express.Router();

router.post('/questions/:questionId/answers/:answerId/comment', validateToken, comment.createComment);

export default router;
