
class QuestionManager {
  constructor(connection) {
    this.conn = connection;
    this.table = 'questions';
    this.answerTable = 'answers';
  }

  createQuestion(user_id, title, content, callback) {
    this.conn.insertQuestion(user_id, title, content, (err, result) => {
      if (err) {
        callback('error');
      }
      this.conn.selectById(this.table, user_id, (res, err) => {
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

  createAnswer(user_id, question_id, answer, callback) {
    this.conn.insertAnswer(user_id, question_id, answer, (err, result) => {
      if (err) {
        callback(err);
      }
      this.getQuestion(question_id, (result, err) => {
        callback(result);
      });
    });
  }

  getAnswer(question_id, callback) {
    this.conn.selectAnswer(this.answerTable, question_id, (err, result) => {
      console.log('Table is ', this.answerTable, 'question id is ', question_id);
      console.log('Result from geting answer ', result, 'error is ', err);
      callback(result, err)
    });
  }

  getQuestionAnswer(id, callback) {
    this.getQuestion(id, (result, err) => {
      console.log('get question from getQuestionAndAnswer', result, 'err', err);
    })
  }
}

export default QuestionManager;
