import expressValidator from 'express-validator';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import authRouter from './routes/authRoute';
import voteRoute from './routes/votesRoute';
import commentRoute from './routes/commentRoute';
import questionRoute from './routes/questionRoute';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());
app.use(express.static(path.resolve(__dirname, './../UI/')));
app.use('/UI', express.static(path.resolve(__dirname, './../UI/')));
app.use('/questions/:questionId/UI', express.static(path.resolve(__dirname, './../UI/')));
app.use('/questions/:questionId/answers/UI', express.static(path.resolve(__dirname, './../UI/')));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './../UI/index.html')));
app.get('/search', (req, res) => res.sendFile(path.resolve(__dirname, './../UI/search.html')));
app.get('/questions/:questionId', (req, res) => res.sendFile(path.resolve(__dirname, './../UI/viewQuestion.html')));
app.get('/questions/:questionId/answers/:answerId', (req, res) => res.sendFile(path.resolve(__dirname, './../UI/updateAnswer.html')));
app.get('/questions/:questionId/answers/:answerId/comment', (req, res) => res.sendFile(path.resolve(__dirname, './../UI/addcomment.html')));

app.use('/api/v1/auth/', authRouter);
app.use('/api/v1', voteRoute);
app.use('/api/v1', commentRoute);
app.use('/api/v1', questionRoute);
app.use(morgan(':method :url :response-time'));

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: false,
    error: {
      message: error.message,
    },
  });
});

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`Action happening on port ${app.get('port')}`);
});

export default app;
