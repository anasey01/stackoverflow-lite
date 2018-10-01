import DatabaseManager from '../net/DatabaseManager';
import QuestionManager from './QuestionManager';

const db = new DatabaseManager();
const questionManager = new QuestionManager(db);

class Votes {
  static upvote(req, res, next) {
    const { questionId, answerId } = req.params;
    const { userId, username } = req.user;
    questionManager.createUpvotes(+questionId, +answerId, userId, username, (err, vote) => {
      if (err) {
        return res.status(401).json({
          success: false,
          messgae: 'unable to upvote answer',
        });
      }
      return next();
    });
  }

  static downvote(req, res, next) {
    const { userId, username } = req.user;
    const { questionId, answerId } = req.params;
    questionManager.createDownvotes(+questionId, +answerId, userId, username, (err, vote) => {
      if (err) {
        return res.status(401).json({
          success: false,
          messgae: 'unable to downote answer',
        });
      }
      return next();
    });
  }

  static getTotalUpvotes(req, res, next) {
    const { questionId, answerId } = req.params;
    questionManager.getUpvotes(+questionId, +answerId, (error, upvotes) => {
      req.totalUpvotes = upvotes.length;
      return next();
    });
  }

  static getTotalDownvotes(req, res, next) {
    const { questionId, answerId } = req.params;
    questionManager.getDownvotes(+questionId, +answerId, (error, downvotes) => {
      req.totalDownvotes = downvotes.length;
      return next();
    });
  }

  static saveUpvotes(req, res) {
    const { totalUpvotes } = req;
    const { questionId, answerId } = req.params;
    questionManager.updateAnswerWithUpvotes(+questionId, +answerId, totalUpvotes, (error, data) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Error saving upvotes for this answer',
          error,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Successfully upvoted this answer',
        answerData: data,
      });
    });
  }

  static saveDownvotes(req, res) {
    const { totalDownvotes } = req;
    const { questionId, answerId } = req.params;
    questionManager.updateAnswerWithDownvotes(+questionId, +answerId, totalDownvotes, (error, data) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Error saving downvotes for this answer',
          error,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Successfully downvoted this answer',
        answerData: data,
      });
    });
  }

  // static getAllVotes(req, res) {

  // }
}
export default Votes;
