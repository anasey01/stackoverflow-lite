import DatabaseManager from '../net/DatabaseManager';
import QuestionManager from './QuestionManager';

const db = new DatabaseManager();
const questionManager = new QuestionManager(db);

class QuestionRoute {

  static allQuestion(req, res) {
    questionManager.getAllQuestion((data, err) => {
      if (err) {
        return res.status(404).json({
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
      } else {
        return  res.status(200).json({
          success: true,
          message: 'question successfully created',
          id: userId,
          title,
          content,
        });
      }
    });
  }

  static addAnswer(req, res) {
    const id = Number(req.params.id);
    const answer = req.body.answer;
    questionManager.getQuestion(id, (result) => {
      if (result.title && result.content) {
        const user_id = req.user._id;
        questionManager.createAnswer(user_id, id, answer, (results, err) => {
          let questionAndAnswer = {
            title : results.title,
            content: results.content,
            created : results.created_at,
            answers: [],
          };
          questionManager.getAnswer(Number(results.id), (answers, err) => {
            console.log('Answer gotten', answers, 'And err', err);
          });
        });
      }
    });
    res.status(200).json({

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
