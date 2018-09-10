
class QuestionManager {
  constructor(connection) {
    this.conn = connection;
    this.table = 'questions';
    this.answerTable = 'answers';
  }

  createQuestion(userId, questionTitle, questionContent, callback) {
    this.conn.insertQuestion(userId, questionTitle, questionContent, (err, result) => {
      callback(err, result.rows);
    });
  }

  getAllQuestion(callback) {
    this.conn.selectQuestions((result, err) => {
      if (err) {
        callback('There was an error retrieving questions');
      }
      callback(result);
    });
  }

  getQuestion(questionId, callback) {
    this.conn.selectByQuestionId(this.table, questionId, (result, err) => {
      if (err) {
        callback(err);
      }
      callback(result);
    });
  }

  getUserQuestions(userId, callback) {
    this.conn.selectQuestionByUserId(userId, (error, result) => {
      callback(error, result);
    });
  }

  createAnswer(userId, questionId, answer, answerNumber, callback) {
    this.conn.insertAnswer(userId, questionId, answer, answerNumber, (err, result) => {
      callback(err, result);
    });
  }

  getSpecificAnswer(questionId, answerId, callback) {
    this.conn.selectOneAnswer(questionId, answerId, (result, err) => {
      callback(result, err);
    });
  }

  getQuestionAndAnswer(questionId, callback) {
    this.conn.selectQuestionAndAnswer(questionId, (result, err) => {
      callback(result, err)
    });
  }

  getAnswer(questionId, callback) {
    this.conn.selectAnswer(this.answerTable, questionId, (err, result) => {
      callback(result, err);
    });
  }

  markAnswer(answerNumber, callback) {
    this.conn.updateMarkedAnswer(answerNumber, (err, result) => {
      if (err) {
        callback('error');
      }
      callback('successfully marked');
    });
  }

  updateAnswer(answerNumber, answer, callback) {
    this.conn.updateQuestionAnswer(answerNumber, answer, (err, result) => {
      callback(err, result.rows);
    });
  }

  createVotes(questionId, answerId, userId, currentVote, otherVote, callback) {
    this.conn.insertVotes(questionId, answerId, userId, currentVote, otherVote, (err, result) => {
      callback(err, result);
    });
  }

  deleteOne(questionId, callback) {
    this.conn.deleteQuestionById(this.table, questionId, (result, err) => {
      callback(result, err);
    });
  }
}

export default QuestionManager;
