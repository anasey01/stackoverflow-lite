import DatabaseManager from '../net/DatabaseManager';
import QuestionManager from './QuestionManager';

const db = new DatabaseManager();
const questionManager = new QuestionManager(db);

class Votes {
  static upvote(req, res) {
    const { questionId, answerId } = req.params;
    const { userId } = req.user;
    questionManager.createVotes(questionId, answerId, userId, 'upvotes', 'downvotes', (err, result) => {
      const votes = {
        totalVotes: result.length,
        totalUpvote: 0,
        totalDownvote: 0,
        questionId: result[0].questionid,
        answerId: result[0].answerid,
      };
      if (err) {
        return res.status(401).json({
          success: false,
          messgae: 'unable to vote',
        });
      }
      result.forEach((item) => {
        votes.totalUpvote += item.upvotes;
        votes.totalDownvote += item.downvotes;
      });
      return res.status(200).json({
        success: true,
        messgage: 'stats for votes',
        votes,
      });
    });
  }

  static downvote(req, res) {
    const { questionId, answerId } = req.params;
    const { userId } = req.user;
    questionManager.createVotes(questionId, answerId, userId, 'downvotes', 'upvotes', (err, result) => {
      let votes = {
        totalVotes: result.length,
        totalUpvote: 0,
        totalDownvote: 0,
        questionId: result[0].questionid,
        answerId: result[0].answerid,
      }
      if (err) {
        return res.status(401).json({
          success: false,
          messgae: 'unable to vote',
        });
      }
      result.forEach((item) => {
        votes.totalUpvote += item.upvotes;
        votes.totalDownvote += item.downvotes;
      });
      return res.status(200).json({
        success: true,
        messgage: 'stats for votes',
        votes,
      });
    });
  }
}
export default Votes;
