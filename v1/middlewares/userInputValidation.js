
/**
 * @class {InputValidation}
 * @description { middleware to validates user Inputs}
 */
class InputValidation {
  /**
     *
     * @param {object} request - Gets user input from request body
     * @param {object} response - Returns json response on error
     * @param {function} next - calls the next method
     */
  static signup(request, response, next) {
    const {
      fullname,
      gender,
      username,
      password,
      email,
    } = request.body;

    const emailRegEx = /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/;
    const fullnameregEx = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    const genderRegEx = /^(M|F)$/i;
    const passwordregEx = /^([a-zA-Z])(?=.*\d)\w{4,9}$/;

    if (typeof fullname !== 'string' || fullname.trim() === '' || fullnameregEx.test(fullname) === false) {
      return response.status(400).json({
        success: false,
        message: 'Enter your fullname in this format John Doe',
      });
    }

    if (typeof gender !== 'string' || gender.trim() === '' || genderRegEx.test(gender) === false) {
      return response.status(400).json({
        success: false,
        message: 'Invalid gender declaration',
      });
    }

    if (typeof username !== 'string' || username.trim() === '') {
      return response.status(400).json({
        success: false,
        message: 'Enter a valid username',
      });
    }

    if (typeof password !== 'string' || passwordregEx.test(password) === false || password.trim() === '') {
      return response.status(400).json({
        success: false,
        message: 'password must be 5 - 10 characters long, start with a letter and contain at least one number. No special characters',
      });
    }

    if (typeof email !== 'string' || emailRegEx.test(email) === false || email.trim() === '') {
      return response.status(400).json({
        success: false,
        message: 'Enter a valid email address',
      });
    }

    return next();
  }

  /**
 *
 * @param { object } request - Request object to get user input
 * @param { object } response - Response on input error
 * @param { function } next - Call next method on success
 */
  static login(request, response, next) {
    const { username, password } = request.body;

    const passwordregEx = /^([a-zA-Z])(?=.*\d)\w{4,9}$/;

    if (typeof username !== 'string' || username.trim() === '') {
      return response.status(400).json({
        success: false,
        message: 'Enter a valid username',
      });
    }

    if (typeof password !== 'string' || passwordregEx.test(password) === false || password.trim() === '') {
      return response.status(400).json({
        success: false,
        message: 'Password must be 5 - 10 characters long, start with a letter and contain at least one number. No special characters',
      });
    }
    return next();
  }

  /**
   *
   * @param {object} request - request method to get the parameter passed in
   * @param {object} response - returns the appopriate response
   * @param {function} next - call next method
   * @return { callback } - on valid question parameter
   */
  static getSpecificQuestion(request, response, next) {
    const questionId = +request.params.id;
    const validParamsRegEx = /^\d+$/;
    if (validParamsRegEx.test(questionId) === false) {
      return response.status(400).json({
        success: false,
        message: 'invalid parameter passed! Params for question should be a number',
      });
    }
    return next();
  }

  /**
   *
   * @param {object} request - request method to get the parameter passed in
   * @param {object} response - returns the appopriate response
   * @param {function} next - call next method
   * @return { callback } - on valid answer parameter
   */
  static getSpecificAnswer(request, response, next) {
    const { answerNumber } = request.params;
    const validParamsRegEx = /^\d+$/;
    if (validParamsRegEx.test(+answerNumber) === false) {
      return response.status(400).json({
        success: false,
        message: 'invalid parameter passed! params for answer should be a number',
      });
    }
    return next();
  }

  /**
   *
   * @param { object } request - Request object to get user's input from body
   * @param { object } response - response object to returns the appopriate response
   * @param { object } next - call next method
   */
  static postQuestion(request, response, next) {
    const {
      questionTitle,
      questionContent,
    } = request.body;

    if (typeof questionTitle !== 'string' || questionTitle.trim() === '') {
      return response.status(400).json({
        success: false,
        message: 'invalid question title type entered',
      });
    }

    if (typeof questionContent !== 'string' || questionContent.trim() === '') {
      return response.status(400).json({
        success: false,
        message: 'invalid question content entered',
      });
    }
    return next();
  }

  /**
   *
   * @param { object } request - question id, answer number, comment from request object
   * @param { object } response - response object to returns the appopriate response
   * @param { callback } next - returns on successful check
   */
  static addCommentToQuestion(request, response, next) {
    const questionid = +request.params.id;
    const { answerNumber } = request.params;
    const { comment } = request.body;
    const validParamsRegEx = /^\d+$/;

    if (validParamsRegEx.test(questionid) === false || validParamsRegEx.test(+answerNumber) === false) {
      return response.status(400).json({
        success: false,
        message: 'invalid parameter passed! params must be a number',
      });
    }

    if (typeof comment !== 'string' || comment.trim() === '') {
      return response.status(400).json({
        success: false,
        message: 'invalid comment content entered',
      });
    }
    return next();
  }
}

export default InputValidation;
