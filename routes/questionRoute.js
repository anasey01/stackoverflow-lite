import express from 'express';
import validateToken from '../middleware/validateToken';
import validateAuthor from '../middleware/validateAuthor';
import inputValidator from '../middleware/inputValidation';
import QuestionRoute from '../controllers/QuestionRoutes';

const router = express.Router();

router.get('/questions', QuestionRoute.allQuestion);
router.get('/search', QuestionRoute.searchQuestion);
router.get('/questions/:id', validateToken, QuestionRoute.specificQuestion);
router.get('/question/:username', validateToken, QuestionRoute.getAllQuestionsByUser);
router.get('/question/:username/mostanswers', validateToken, QuestionRoute.mostAnswers);
router.post('/questions', inputValidator.postQuestion, validateToken, QuestionRoute.postQuestion);
router.post('/questions/:id/answers', validateToken, QuestionRoute.addAnswer);
router.get('/questions/:id/answers', validateToken, QuestionRoute.getAnswer);
router.delete('/questions/:id/', validateToken, validateAuthor, QuestionRoute.deleteQuestion);
router.put('/questions/:questionId/answers/:answerNumber', validateToken, QuestionRoute.updateAnswer);
router.get('*', QuestionRoute.notFound);

export default router;
