const userTableQuery = `CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL NOT NULL PRIMARY KEY,
    fullname text NOT NULL,
    gender varchar(1) NOT NULL,
    username varchar(25) UNIQUE NOT NULL,
    password text NOT NULL,
    email varchar(150) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );`;

const questionTableQuery = `
CREATE TABLE IF NOT EXISTS questions(
  question_id SERIAL NOT NULL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  username varchar(25) REFERENCES users(username) ON DELETE CASCADE,
  question_title TEXT NOT NULL,
  question_content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);`;

const answerTableQuery = `
    CREATE TABLE IF NOT EXISTS answers(
      answer_id SERIAL NOT NULL PRIMARY KEY,
      accepted BOOLEAN NOT NULL,
      upvotes INT NOT NULL,
      downvotes INT NOT NULL,
      question_id INTEGER REFERENCES questions(question_id) ON DELETE CASCADE,
      user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
      username varchar(25) REFERENCES users(username) ON DELETE CASCADE,
      answer TEXT NOT NULL,
      answer_number INT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );`;

const commentTableQuery = `
CREATE TABLE IF NOT EXISTS comments(
    comment_id SERIAL NOT NULL PRIMARY KEY,
    comment TEXT NOT NULL,
    question_id INTEGER REFERENCES questions(question_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    answer_id INTEGER REFERENCES answers(answer_id) ON DELETE CASCADE,
    username varchar(25) REFERENCES users(username) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);`;

const votesTableQuery = `
CREATE TABLE IF NOT EXISTS votes(
  vote_id SERIAL NOT NULL PRIMARY KEY,
  upvotes INTEGER NOT NULL,
  downvotes INTEGER NOT NULL,
  username varchar(25) REFERENCES users(username) ON DELETE CASCADE,
  question_id INTEGER REFERENCES questions(question_id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  answer_id INTEGER REFERENCES answers(answer_id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);`;

const registerUserQuery = 'INSERT INTO users (fullname, gender, username, password, email) VALUES($1, $2, $3, $4, $5) RETURNING *';
const insertQuestionQuery = 'INSERT INTO questions (user_id, question_title, question_content, username) VALUES ($1, $2, $3, $4) RETURNING *';
const insertAnswerQuery = 'INSERT INTO answers (user_id, question_id, answer, answer_number, accepted, upvotes, downvotes, username) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
const insertUpvotesQuery = 'INSERT INTO votes (upvotes, downvotes, question_id, user_id, answer_id, username) VALUES ($1, $2, $3, $4, $5, $6)';
const insertDownvotesQuery = 'INSERT INTO votes (upvotes, downvotes, question_id, user_id, answer_id, username) VALUES ($1, $2, $3, $4, $5, $6)';
const insertCommentQuery = 'INSERT INTO comments (user_id, question_id, answer_id, comment, username) VALUES ($1, $2, $3, $4, $5) RETURNING *';
const insertNumberOfVotesToAnswersTable = 'UPDATE answers SET upvotes = $1 WHERE answer_number = $2 AND question_id = $3 RETURNING *';
const insertNumberOfDownvotesToAnswersTable = 'UPDATE answers SET downvotes = $1 WHERE answer_number = $2 AND question_id = $3 RETURNING *';
const selectCommentsByQuestionId = 'SELECT * FROM comments WHERE comments.question_id=$1';
const selectUserByUsername = 'SELECT * FROM users WHERE username = $1';
const selectAllQuestionsQuery = `SELECT questions.question_id, questions.user_id, questions.question_title, questions.question_content, questions.created_at, questions.username, COUNT(answers.question_id) AS noOfAnswer FROM questions LEFT JOIN answers on (questions.question_id = answers.question_id) 
GROUP BY questions.question_id`;
const selectQuestionByIdQuery = 'SELECT * FROM questions where questions.question_id = $1';
const deleQuestionQuery = 'DELETE FROM questions WHERE questions.question_id = $1';
const answersForAQuestionQuery = 'SELECT answers.* FROM answers INNER JOIN questions ON answers.question_id = questions.question~_id WHERE answers.question_id=$1';
const answerForAQuestionQuery = 'SELECT answers.* FROM answers WHERE answers.answer_number = $1 AND answers.question_id = $2';
const updateAnswerQuery = 'UPDATE answers SET answer = $1 WHERE answers.answer_number = $2 AND answers.question_id = $3 RETURNING *';
const updateAnswerWithUpvotesQuery = 'UPDATE answers SET upvotes = $1 WHERE answer_number = $2 AND question_id = $3 RETURNING *';
const updateAnswerWithDownvotesQuery = 'UPDATE answers SET downvotes = $1 WHERE answer_number = $2 AND question_id = $3 RETURNING *';
const selectAllUpvotes = 'SELECT * FROM votes WHERE votes.question_id = $1 AND votes.answer_id = $2 AND votes.upvotes = $3';
const selectAllDownvotes = 'SELECT * FROM votes WHERE votes.question_id = $1 AND votes.answer_id = $2 AND votes.downvotes = $3';
const selectAllAnswersForSpecificQuestionQuery = 'SELECT * FROM answers WHERE answers.question_id = $1';

export default {
  userTableQuery,
  questionTableQuery,
  answerTableQuery,
  commentTableQuery,
  votesTableQuery,
  registerUserQuery,
  insertQuestionQuery,
  insertAnswerQuery,
  insertUpvotesQuery,
  insertDownvotesQuery,
  insertCommentQuery,
  updateAnswerQuery,
  deleQuestionQuery,
  selectUserByUsername,
  selectAllQuestionsQuery,
  selectQuestionByIdQuery,
  selectAllUpvotes,
  selectAllDownvotes,
  selectCommentsByQuestionId,
  answersForAQuestionQuery,
  answerForAQuestionQuery,
  updateAnswerWithUpvotesQuery,
  updateAnswerWithDownvotesQuery,
  insertNumberOfVotesToAnswersTable,
  insertNumberOfDownvotesToAnswersTable,
  selectAllAnswersForSpecificQuestionQuery,
};
