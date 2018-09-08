import express from 'express';
import validateToken from '../middleware/validateToken';
import validateAuthor from '../middleware/validateAuthor';
import QuestionRoute from '../controllers/QuestionRoutes';

const router = express.Router();

router.get('/questions', QuestionRoute.allQuestion);
router.get('/questions/:id', validateToken, QuestionRoute.specificQuestion);
router.get('/question/:userId', validateToken, QuestionRoute.getAllQuestionsByUser);
router.post('/questions', validateToken, QuestionRoute.postQuestion);
router.post('/questions/:id/answers', validateToken, QuestionRoute.addAnswer);
router.delete('/questions/:id/', validateToken, validateAuthor, QuestionRoute.deleteQuestion);
router.put('/questions/:questionId/answers/:answerId', validateToken, QuestionRoute.updateQuestion);
router.get('*', QuestionRoute.notFound);

export default router;
