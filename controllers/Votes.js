import DatabaseManager from '../net/DatabaseManager';
import QuestionManager from './QuestionManager';

const db = new DatabaseManager();
const questionManager = new QuestionManager(db);

class Votes {
  static upvote(req, res) {
    const { questionId, answerId } = req.params;
    const { userId, username } = req.user;
    questionManager.createVotes(Number(questionId), Number(answerId), userId, 'upvotes', 'downvotes', username, (err, vote) => {
      if (err) {
        return res.status(401).json({
          success: false,
          messgae: 'unable to vote',
        });
      }
      return res.status(200).json({
        success: true,
        messgage: 'stats for votes',
        vote,
      });
    });
  }

  static downvote(req, res) {
    const { userId, username } = req.user;
    const { questionId, answerId } = req.params;
    questionManager.createVotes(Number(questionId), Number(answerId), userId, 'downvotes', 'upvotes', username, (err, vote) => {
      if (err) {
        return res.status(401).json({
          success: false,
          messgae: 'unable to vote',
        });
      }
      return res.status(200).json({
        success: true,
        messgage: 'stats for votes',
        vote,
      });
    });
  }

  static getAllVotes(req, res) {
    const { questionId, answerId } = req.params;
    questionManager.getVotes(Number(questionId), Number(answerId), (err, allVotes) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'unable to get all votes',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'All votes',
        allVotes,
      });
    });
  }
}
export default Votes;
