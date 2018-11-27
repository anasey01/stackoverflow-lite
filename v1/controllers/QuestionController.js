import dbQuery from '../model/dbQuery';
import pool from '../model/dbConnections';

/**
 * @class { QuestionController }
 * @description { Handles question routes }
 */
class QuestionController {
  /**
     *
     * @param { object } request - Request Object
     * @param { object } response - Response Object
     * @returns { json } - returns appropriate json response for the method.
     */
  static getAllQuestion(request, response) {
    pool.query(dbQuery.selectAllQuestionsQuery)
      .then((allQuestions) => {
        const questions = allQuestions.rows;
        if (questions.length < 1) {
          return response.status(404).json({
            success: false,
            message: 'No question from in the database',
          });
        }
        return response.status(200).json({
          success: true,
          message: 'All Questions Retrived!',
          questions,
        });
      })
      .catch(error => response.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      }));
  }

  /**
   *
   * @param { object } request - request object to get request params
   * @param { object } response - response object
   * @returns { json } - returns appropriate json response
   */
  static getSpecificQuestion(request, response) {
    const questionId = +request.params.id;

    const values = [questionId];
    pool.query(dbQuery.selectQuestionByIdQuery, values)
      .then((data) => {
        const question = data.rows[0];
        const { answer } = request;
        const single = {
          question,
          answer,
        };
        if (data.rows.length < 1) {
          return response.status(404).json({
            success: false,
            message: 'No question Found',
          });
        }
        return response.status(200).json({
          success: true,
          message: 'Question retrieved',
          single,
        });
      })
      .catch(error => response.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      }));
  }

  /**
   *
   * @param { object } request - request object to get user input
   * @param { object } response - response object to return appropriate json response
   */
  static postQuestion(request, response) {
    const { questionTitle, questionContent } = request.body;
    const { userId, username } = request.user;
    const values = [userId, questionTitle, questionContent, username];
    pool.query(dbQuery.insertQuestionQuery, values)
      .then((data) => {
        const question = data.rows[0];
        return response.status(200).json({
          success: true,
          message: 'Question posted successfully',
          question,
        });
      })
      .catch(error => response.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      }));
  }

  /**
   *
   * @param { object } request - Request object to get question id
   * @param { object } response - Response object to return appropriate json response
   * @param { function } next - call the next method
   */
  static validateQuestionExistence(request, response, next) {
    const questionId = request.params.id;
    const values = [questionId];
    pool.query(dbQuery.selectQuestionByIdQuery, values)
      .then((data) => {
        const questionExist = data.rowCount === 1 ? 'existing' : 'question does not exisit';
        const statusCode = questionExist === 'existing' ? 200 : 404;
        const success = statusCode !== 404;

        if (questionExist === 'existing') {
          return next();
        }
        return response.status(+statusCode).json({
          success,
          message: questionExist,
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
 * @param { object } request - request object to get question id
 * @param { object } response - returns the appropriate json response
 * @param { function } next - calls the next middleware
 */
  static validateQuestionAuthor(request, response, next) {
    const questionId = request.params.id;
    const { username } = request.user;

    const values = [questionId];
    pool.query(dbQuery.selectQuestionByIdQuery, values)
      .then((data) => {
        const questionAuthor = data.rows[0].username;
        if (questionAuthor !== username) {
          return response.status(401).json({
            success: false,
            message: 'you are not the author of this question',
          });
        }
        return next();
      })
      .catch(error => response.status(500).json({
        success: false,
        error: error.message,
      }));
  }

  /**
   *
   * @param { object } request - request object to get question id
   * @param { object } response - returns the appropriate json response
   */
  static deleteQuestion(request, response) {
    const questionId = request.params.id;

    const values = [questionId];
    pool.query(dbQuery.deleQuestionQuery, values)
      .then((data) => {
        const message = data.rowCount === 1 ? 'Question successfully deleted' : 'unable to delete question';
        return response.status(200).json({
          success: true,
          message,
        });
      })
      .catch(error => response.status(500).json({
        success: false,
        message: 'internal server error',
        error: error.message,
      }));
  }
}

export default QuestionController;
