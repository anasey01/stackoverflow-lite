import dbQuery from '../model/dbQuery';
import pool from '../model/dbConnections';

/**
 * @class { VotesController } - handles upvotes and downvotes endpoints
 */
class VotesController {
  /**
     *
     * @param { object } request - answer number, questionId, userna
     * @param { object } response - response object to return appropriate json response
     * @param { callback } next - call next method on success
     */
  static restrictVoteFromAnswerAuthor(request, response, next) {
    const { answerNumber } = +request.params;
    const questionId = +request.params.id;
    const { username } = request.user;
    const values = [answerNumber, questionId];
    pool.query(dbQuery.answerForAQuestionQuery, values)
      .then((data) => {
        const answerAuthor = data.rows[0].username;
        if (username !== answerAuthor) {
          return response.status(403).json({
            success: false,
            messgage: 'sorry, you cannot upvote or downvote your answer',
          });
        }
        return next();
      })
      .catch(error => response.status(500).json({
        success: false,
        message: 'internal server error',
        error: error.message,
      }));
  }

  /**
   *
   * @param { object } request - answer number, question id, user id, username
   * @param { object } response - response object to return appropriate json response
   * @param { callback } next - call next method on success
   */
  static upvoteAnswer(request, response, next) {
    const { answerNumber } = +request.params;
    const questionId = +request.params.id;
    const { userId, username } = request.user;

    const values = [1, 0, questionId, userId, answerNumber, username];
    pool.query(dbQuery.insertUpvotesQuery, values)
      .then(data => next())
      .catch(error => response.status(500).json({
        success: false,
        message: 'internal server error',
        error: error.message,
      }));
  }

  /**
   *
   * @param { object } request - question id, answer number on request object
   * @param { object } response - response object to return appropriate json response
   * @param { callback } next - call next method on success
   * @return { object } - total upvotes returned on request object.
   */
  static countTotalUpvotes(request, response, next) {
    const questionId = +request.params.id;
    const { answerNumber } = +request.params;

    const values = [questionId, answerNumber, 1];
    pool.query(dbQuery.selectAllUpvotes, values)
      .then((data) => {
        request.totalUpvotes = data.rows.length;
        return next();
      })
      .catch(error => response.status(500).json({
        success: false,
        message: 'internal server error',
        error: error.message,
      }));
  }

  /**
   *
   * @param { object } request - total upvotes, answer number on request object
   * @param { object } response - response object to return appropriate json response
   */
  static saveCurrentTotalUpvoteToAnswer(request, response) {
    const { totalUpvotes } = +request;
    const { answerNumber } = +request.params;
    const questionId = +request.params.id;
    const values = [totalUpvotes, answerNumber, questionId];
    pool.query(dbQuery.updateAnswerWithUpvotesQuery, values)
      .then((data) => {
        const answer = data.rows[0];
        return response.status(200).json({
          success: true,
          message: 'successfully upvoted this answer',
          answer,
        });
      })
      .catch(error => response.status(500).json({
        success: false,
        messgae: 'internal server error',
        error: error.message,
      }));
  }

  /**
   *
   * @param { object } request - answer number, question id, user id, username
   * @param { object } response - response object to return appropriate json response
   * @param { callback } next - call next method on success
   */
  static downvoteAnswer(request, response, next) {
    const { answerNumber } = +request.params;
    const questionId = +request.params.id;
    const { userId, username } = request.user;

    const values = [0, 1, questionId, userId, answerNumber, username];
    pool.query(dbQuery.insertDownvotesQuery, values)
      .then(data => next())
      .catch(error => response.status(500).json({
        success: false,
        message: 'internal server error',
        error: error.message,
      }));
  }

  /**
   *
   * @param { object } request - question id, answer number on request object
   * @param { object } response - response object to return appropriate json response
   * @param { callback } next - call next method on success
   * @return { object } - total downvotes returned on request object.
   */
  static countTotalDownvotes(request, response, next) {
    const questionId = +request.params.id;
    const { answerNumber } = +request.params;

    const values = [questionId, answerNumber, 1];
    pool.query(dbQuery.selectAllDownvotes, values)
      .then((data) => {
        request.totalDownvotes = data.rows.length;
        return next();
      })
      .catch(error => response.status(500).json({
        success: false,
        message: 'internal server error',
        error: error.message,
      }));
  }

  /**
   *
   * @param { object } request - total downvotes, answer number on request object
   * @param { object } response - response object to return appropriate json response
   */
  static saveCurrentTotalDownvoteToAnswer(request, response) {
    const { totalDownvotes } = request;
    const { answerNumber } = +request.params;
    const questionId = +request.params.id;
    const values = [totalDownvotes, answerNumber, questionId];
    pool.query(dbQuery.updateAnswerWithDownvotesQuery, values)
      .then((data) => {
        const answer = data.rows[0];
        return response.status(200).json({
          success: true,
          message: 'successfully downvoted this answer',
          answer,
        });
      })
      .catch(error => response.status(500).json({
        success: false,
        messgae: 'internal server error',
        error: error.message,
      }));
  }
}

export default VotesController;
