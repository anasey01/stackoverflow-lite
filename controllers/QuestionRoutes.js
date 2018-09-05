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
      return res.status(200).json({ questions: data });
    });
  }

  static specificQuestion(req, res) {
    const questionId = req.params.id;
    const questionData = {};
    questionManager.getQuestion(questionId, (result) => {
      questionData.success = true;
      questionData.message = 'Questions retrieved';
      questionData.questionId = result.questionid;
      questionData.userId = result.userid;
      questionData.questionTitle = result.questiontitle;
      questionData.questionContent = result.questioncontent;
      questionData.createdAt = result.createdat;
      questionData.answers = [];
      questionManager.getAnswer(questionId, (answer) => {
        if (answer.rows.length > 1) {
          answer.rows.forEach((item) => {
            questionData.answers.push({ item });
          });
          res.status(200).json(questionData);
        }
        if (answer.rows.length === 1) {
          const singleAnswer = answer.rows;
          questionData.answers.push({ singleAnswer });
          res.status(200).json(questionData);
        }
      });
      res.status(200).json(questionData);
    });
  }

  static postQuestion(req, res) {
    const { questionTitle, questionContent } = req.body;
    const { userId } = req.user;
    questionManager.createQuestion(userId, questionTitle, questionContent, (result) => {
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
        userid: result.userid,
        questionid: result.questionid,
        questiontitle: result.questiontitle,
        questioncontent: result.questioncontent,
      });
    });
  }

  static addAnswer(req, res) {
    const questionId = Number(req.params.id);
    const { answer } = req.body;
    questionManager.getQuestion(questionId, (result) => {
      const questionAndAnswer = {
        success: true,
        message: `Answer added to question ${questionId}`,
        questionId: result.questionid,
        userId: result.userid,
        questionTitle: result.questiontitle,
        questionContent: result.questioncontent,
        createdAt: result.createdat,
        answers: [],
      };

      if (result.questiontitle && result.questioncontent) {
        const { userId } = questionAndAnswer;
        questionManager.createAnswer(userId, questionId, answer, (results, err) => {
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
