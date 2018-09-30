import QuestionsManager from './QuestionManager';
import DatabaseManager from '../net/DatabaseManager';

const db = new DatabaseManager();
const questionsManager = new QuestionsManager(db);

class Comment {

  static createComment(req, res) {
    const { answerId } = req.params;
    const { questionId } = req.params;
    const { userId, username } = req.user;
    const { comment } = req.body;
    questionsManager.createComments(userId, +questionId, answerId, comment, username, (error, resComment) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'unable to add comments',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Comment successfully added',
        resComment,
      });
    });
  }

  static getComments(req, res, next) {
    const questionId = req.params.id;
    questionsManager.getAllComments(questionId, (error, comments) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'unable to get comments for this answer',
        });
      }
      req.userComment = comments;
      return next();
    });
  }
}

export default Comment;
