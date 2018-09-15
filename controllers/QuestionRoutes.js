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
          return res.status(200).json(questionData);
        }
        if (answer.rows.length === 1) {
          const singleAnswer = answer.rows;
          questionData.answers.push({ singleAnswer });
          res.status(200).json(questionData);
        }
      });
      return res.status(200).json(questionData);
    });
  }

  static postQuestion(req, res) {
    const { questionTitle, questionContent } = req.body;
    const { userId } = req.user;
    questionManager.createQuestion(userId, questionTitle, questionContent, (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'unable to create question',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'question successfully created',
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
    const { userId } = req.user;
    const { answer } = req.body;
    questionManager.getQuestionAndAnswer(questionId, (err, result) => {
      const answerNumber = result.length + 1;
      questionManager.createAnswer(userId, questionId, answer, answerNumber, (error, data) => {
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

  static getAllQuestionsByUser(req, res) {
    const { userId } = req.user;
    questionManager.getUserQuestions(userId, (error, result) => {
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
    const currentUserId = req.user.userId;
    const { answer } = req.body;
    questionManager.getQuestionAndAnswer(questionId, (err, result) => {
      const answerData = [];
      let isAnswer = 'not found';
      result.forEach((item) => {
        if (item.answernumber === Number(answerNumber)) {
          isAnswer = 'found';
          return answerData.push(item);
        }
      });
      if (isAnswer === 'found') {
        if (currentUserId === Number(questionId)) {
          questionManager.markAnswer(answerNumber, (result) => {
            if (result === 'successfully marked') {
              return res.status(200).json({
                success: true,
                message: 'Answer marked as approved!',
              });
            }
            return res.status(500).json({
              success: false,
              message: 'unable to mark answer',
            });
          });
        } else if (currentUserId === answerData[0].userid) {
          questionManager.updateAnswer(answerNumber, answer, (error, answerInfo) => {
            if (error) {
              return res.status(500).json({
                success: false,
                message: 'Unable to update Answer',
              });
            }
            return res.status(200).json({
              success: true,
              message: 'Your answer has been updated',
              answerInfo,
            });
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: isAnswer,
        });
      }
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
