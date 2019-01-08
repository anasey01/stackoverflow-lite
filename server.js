import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './v1/routes/usersRoute';
import questionsRoute from './v1/routes/questionsRoute';
import answersRoute from './v1/routes/answersRoute';
import commentsRoute from './v1/routes/commentsRoute';
import votesRoute from './v1/routes/votesRoute';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/', questionsRoute);
app.use('/api/v1/', answersRoute);
app.use('/api/v1/', votesRoute);
app.use('/api/v1/', commentsRoute);

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
