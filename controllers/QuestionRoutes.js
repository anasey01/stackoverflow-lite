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
      return res.status(200).json({
        success: true,
        message: 'All Questions Retrieved',
        questions: data,
      });
    });
  }

  static specificQuestion(req, res) {
    const questionId = req.params.id;
    questionManager.getQuestion(questionId, (error, result) => {
      const question = result;
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Failed to fetch question',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'successfully fetched question',
        question,
      });
    });
  }

  static postQuestion(req, res) {
    const { questionTitle, questionContent } = req.body;
    const { userId, username } = req.user;
    questionManager.createQuestion(userId, questionTitle, questionContent, username, (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'unable to create question',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'question successfully created',
        username: result[0].username,
        userId: result[0].userid,
        questionId: result[0].questionid,
        questionTitle: result[0].questiontitle,
        questionContent: result[0].questioncontent,
        createdAt: result[0].createdat,
      });
    });
  }

  static addAnswer(req, res) {
    const questionId = Number(req.params.id);
    const { userId, username } = req.user;
    const { answer } = req.body;
    questionManager.getQuestionAndAnswer(questionId, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'unable to retrieve answers',
        });
      }
      const answerNumber = result.length + 1;
      questionManager.createAnswer(userId, questionId, answer, answerNumber, username, (error, data) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'Unable to add answer',
          });
        }
        const answerInfo = data.rows[0];
        return res.status(200).json({
          success: true,
          message: 'Your answer has been successfully added',
          answerInfo,
        });
      });
    });
  }

  static getAnswer(req, res) {
    const questionId = Number(req.params.id);
    questionManager.getQuestionAndAnswer(questionId, (err, result) => {
      return res.status(200).json({
        success: true,
        message: result,
      });
    });
  }

  static getAllQuestionsByUser(req, res) {
    const { username } = req.user;
    questionManager.getUserQuestions(username, (error, result) => {
      const userQuestions = result;
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'unable to retrieve questions',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'All Questions by User',
        userQuestions,
      });
    });
  }

  static deleteQuestion(req, res) {
    const { id } = req.params;
    questionManager.deleteOne(id, (result, err) => {
      let isDeleted = '';
      if (result.rowCount === 1) {
        isDeleted = 'deleted';
      }
      if (isDeleted === 'deleted') {
        return res.status(200).json({
          success: true,
          message: 'Question deleted!',
        });
      }
      if (isDeleted === '') {
        return res.status(401).json({
          success: false,
          message: 'Unable to delete question',
        });
      }
    });
  }


  static updateAnswer(req, res) {
    const { questionId, answerNumber } = req.params;
    const { answer } = req.body;
    questionManager.updateAnswer(answerNumber, answer, questionId, (error, answerUpdate) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Unable to update Answer',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Your answer has been updated',
        answer: answerUpdate[0],
      });
    });
  }

  static mostAnswers(req, res) {
    const { username } = req.user;
    questionManager.orderedByMostAnswers(username, (error, mostAnswers) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'unable to get most answered question',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Questions by user with the most answers',
        mostAnswers,
      });
    });
  }

  static searchQuestion(req, res) {
    const queryParameter = req.query.q;
    questionManager.searchQuestion(queryParameter, (error, match) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'An error occurred while searching for question',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Search result successful',
        match,
      });
    });
  }

  static notFound(req, res) {
    return res.status(404).json({
      status: false,
      message: 'Not Found!',
    });
  }
}

export default QuestionRoute;
