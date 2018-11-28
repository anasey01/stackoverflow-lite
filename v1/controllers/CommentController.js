import dbQuery from '../model/dbQuery';
import pool from '../model/dbConnections';

class CommentController {
  static addCommentToAnswer(request, response) {
    const { userId, username } = request.user;
    const { answerNumber } = request.params;
    const questionId = request.params.id;
    const { comment } = request.body;

    const values = [userId, questionId, answerNumber, comment, username];
    pool.query(dbQuery.insertCommentQuery, values)
      .then((data) => {
        const comments = data.rows[0];
        return response.status(200).json({
          success: true,
          message: 'comment has been successfully added',
          comments,
        });
      })
      .catch(error => response.status(500).json({
        success: false,
        message: 'internal server error',
        error: error.message,
      }));
  }

  static getAllCommentsForAQuestion(request, response, next) {
    const questionId = request.params.id;

    const values = [questionId];
    pool.query(dbQuery.selectCommentsByQuestionId, values)
      .then((data) => {
        const comments = data.rows;
        if (comments.length === 0) {
          request.comments = comments;
          return next();
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
 * @param { object } request
 * @param { object } response - returns the appropriate json response
 * @returns { json } - Response for invalid routes
 */
  static notFound(request, response) {
    return response.status(404).json({
      success: false,
      message: 'invalid route',
    });
  }
}

export default CommentController;
