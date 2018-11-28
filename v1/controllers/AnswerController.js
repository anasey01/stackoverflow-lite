import dbQuery from '../model/dbQuery';
import pool from '../model/dbConnections';

/**
 * @class { AnswerController } - Endpoints to answer routes
 */
class AnswerController {
  /**
     *
     * @param { object } request - request object to retrieve question id and answer number
     * @param { object } response - response object returns appropriate json response for the method
     * @param { function } next - calls the next method on success
     */
  static validateAnswerExistence(request, response, next) {
    const { answerNumber } = request.params;
    const questionId = request.params.id;
    const values = [answerNumber, questionId];
    pool.query(dbQuery.answerForAQuestionQuery, values)
      .then((data) => {
        if (data.rowCount !== 1) {
          return response.status(404).json({
            success: false,
            message: 'sorry, answer you requested for was not found',
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
   * @param { object } request - username, question id from request object
   * @param { object } response - response object returns appropriate json response for the method
   * @param { function } next - calls the next method on success
   */
  static restrictQuestionAuthorFromAnswering(request, response, next) {
    const { username } = request.user;
    const questionId = request.params.id;

    const values = [questionId];
    pool.query(dbQuery.selectQuestionByIdQuery, values)
      .then((data) => {
        const questionAuthor = data.rows[0].username;
        if (username === questionAuthor) {
          return response.status(403).json({
            success: false,
            message: 'sorry, you\'re not allowed to answer your question!',
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
   * @param { object } request - request object to get question id
   * @param { object } response - response object to return appropriate json response for the method
   * @param { function } next - calls the next method
   * @return { object } answernumber {linear numbering to answers for a question} on request object
   */
  static calculateNumberOfAnswers(request, response, next) {
    const questionId = request.params.id;

    const values = [questionId];
    pool.query(dbQuery.answersForAQuestionQuery, values)
      .then((data) => {
        const answerNumber = data.rows.length + 1;
        request.answerNumber = answerNumber;
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
   * @param { object } request - question id, user id, username, answer content and answer number;
   * @param { object } response - response object to return appropriate json response for the method
   */
  static addAnswerToQuestion(request, response) {
    const questionId = request.params.id;
    const { userId, username } = request.user;
    const { answer } = request.body;
    const { answerNumber } = request;

    const values = [userId, questionId, answer, answerNumber, false, 0, 0, username];
    pool.query(dbQuery.insertAnswerQuery, values)
      .then((data) => {
        const answerInfo = data.rows[0];
        return response.status(200).json({
          success: true,
          message: 'successfully added your answer',
          answerInfo,
        });
      })
      .catch(error => response.status(500).json({
        success: false,
        message: 'internal server error',
        error: error.message,
      }));
  }

  /**
   *
   * @param { object } request - answer update, answer id and question id
   * @param { object } response - response object to return appropriate json response for the method
   */
  static updateAnswerToQuestion(request, response) {
    const { answer } = request.body;
    const { answerNumber } = request.params;
    const questionId = request.params.id;
    const values = [answer, answerNumber, questionId];

    pool.query(dbQuery.updateAnswerQuery, values)
      .then((data) => {
        const answerUpdate = data.rows[0];
        return response.status(200).json({
          success: true,
          message: 'answer successfully updated.',
          answerUpdate,
        });
      })
      .catch(error => response.status(500).json({
        success: false,
        message: 'internal server error',
        error: error.message,
      }));
  }

  /**
   *
   * @param { object } request - answer update, answer id and question id, username
   * @param { object } response - response object to return appropriate json response for the method
   * @param { function } next - move to the next method on success
   */
  static validateAnswerAuthor(request, response, next) {
    const { answerNumber } = request.params;
    const questionId = request.params.id;
    const { username } = request.user;
    const values = [answerNumber, questionId];
    pool.query(dbQuery.answerForAQuestionQuery, values)
      .then((data) => {
        const currentAnswerData = data.rows[0];
        if (username !== currentAnswerData.username) {
          return response.status(403).json({
            success: false,
            message: 'not autorized to perform any operation on this answer',
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
   * @param { object } request - question id from request object
   * @param { object } response - response object to return appropriate json response for the method
   * @param { callback } next - call next method on success
   */
  static retrieveAnswerForSpecificQuestion(request, response, next) {
    const questionId = request.params.id;
    const values = [questionId];
    pool.query(dbQuery.selectAllAnswersForSpecificQuestionQuery, values)
      .then((data) => {
        const answer = data.rows;
        request.answer = answer;
        return next();
      })
      .catch(error => response.status(500).json({
        success: false,
        message: 'internal server error',
        error: error.message,
      }));
  }
}

export default AnswerController;
