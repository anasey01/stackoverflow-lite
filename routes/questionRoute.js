import express from 'express';
import validateToken from '../middleware/validateToken';
import QuestionRoute from '../controllers/QuestionRoutes';

const router = express.Router();

router.get('/questions', QuestionRoute.allQuestion);
router.get('/questions/:id', validateToken, QuestionRoute.specificQuestion);
router.post('/questions', validateToken, QuestionRoute.postQuestion);
router.post('/questions/:id/answers', validateToken, QuestionRoute.addAnswer);
router.get('*', QuestionRoute.notFound);

export default router;
