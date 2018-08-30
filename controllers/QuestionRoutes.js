import DatabaseManager from '../net/DatabaseManager';
import QuestionManager from './QuestionManager';

const db = new DatabaseManager();
const questionManager = new QuestionManager(db);

class QuestionRoute {
  static allQuestion(req, res) {
    questionManager.getAllQuestion((data, err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'No question found',
        });
      }
      return res.status(200).json(data);
    });
  }

  static specificQuestion(req, res) {
    const questionId = req.params.id;
    questionManager.getQuestion(questionId, result => res.status(200).json(result));
  }

  static postQuestion(req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const userId = req.user._id;
    questionManager.createQuestion(userId, title, content, (result) => {
      let error = false;
      if (result === 'error') {
        error = true;
      }

      if (error) {
        return res.status(400).json({
          success: false,
          message: 'unable to create question',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'question successfully created',
        id: userId,
        title,
        content,
      });
    });
  }

  static addAnswer(req, res) {
    const id = Number(req.params.id);
    const answer = req.body;
    questionManager.getQuestion(id, (result) => {
      let questionAndAnswer = {
        id: result.id,
        userId: result.user_id,
        title: result.title,
        content: result.content,
        created: result.created_at,
        answers: [],
      };
      if (result.title && result.content) {
        const userId = questionAndAnswer.userId;
        questionManager.createAnswer(userId, id, answer, (results, err) => {
          if (results.rows.length > 1) {
            results.rows.forEach((item) => {
              questionAndAnswer.answers.push(item);
            });
            res.status(200).json(questionAndAnswer);
          }
          if (results.rows.length === 1) {
            const singleAnswer = results.rows;
            questionAndAnswer.answers.push({ singleAnswer });
            res.status(200).json(questionAndAnswer);
          }
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'No Answer found',
        });
      }
    });
  }

  static notFound(req, res) {
    res.status(404).json({
      status: false,
      message: 'Not Found!',
    });
  }
}

export default QuestionRoute;
