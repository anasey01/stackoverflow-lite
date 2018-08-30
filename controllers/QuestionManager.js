
class QuestionManager {
  constructor(connection) {
    this.conn = connection;
    this.table = 'questions';
    this.answerTable = 'answers';
  }

  createQuestion(userId, title, content, callback) {
    this.conn.insertQuestion(userId, title, content, (err, result) => {
      if (err) {
        callback('error');
      }
      this.conn.selectById(this.table, userId, (res, err) => {
        if (err) {
          callback(err);
        } else {
          callback(res);
        }
      });
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

  getQuestion(id, callback) {
    this.conn.selectById(this.table, id, (result, err) => {
      if (err) {
        callback(err);
      }
      callback(result);
    });
  }

  createAnswer(userId, questionId, answer, callback) {
    this.conn.insertAnswer(userId, questionId, answer, (err, result) => {
      if (err) {
        callback(err);
      }
      this.getAnswer(questionId, (result, err) => {
        callback(result);
      });
    });
  }

  getAnswer(questionId, callback) {
    this.conn.selectAnswer(this.answerTable, questionId, (err, result) => {
      callback(result, err);
    });
  }

}

export default QuestionManager;