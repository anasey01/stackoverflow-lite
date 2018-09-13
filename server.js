import express from 'express';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import authRouter from './routes/authRoute';
import voteRoute from './routes/votesRoute';
import questionRoute from './routes/questionRoute';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.methods === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET, OPTIONS');
    return res.status(200).json({});
  }
  next();
});
app.use(express.static(path.resolve(__dirname, './../UI/')));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './../UI/index.html')));
app.use('/api/v1', questionRoute);
app.use('/api/v1/auth/', authRouter);
app.use('/api/v1', voteRoute);
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
  console.log(`Action happening on port ${app.get('port')}`);
});

export default app;
