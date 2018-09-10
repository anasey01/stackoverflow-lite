import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from './middleware/crossOrigin';
import authRouter from './routes/authRoute';
import voteRoute from './routes/votesRoute';
import errorHandler from './middleware/error';
import questionRoute from './routes/questionRoute';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors);
app.use('/api/v1', questionRoute);
app.use('/api/v1/auth/', authRouter);
app.use('/api/v1', voteRoute);
app.use(morgan(':method :url :response-time'));
app.use(errorHandler.notFound);
app.use(errorHandler.serverError);

app.set('port', process.env.PORT || 8080);


app.listen(app.get('port'), () => {
  console.log(`Action happening on port ${app.get('port')}`);
});

export default app;
