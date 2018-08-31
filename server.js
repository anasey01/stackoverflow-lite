import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import questionRoute from './routes/questionRoute';
import authRouter from './routes/authRoute';


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', questionRoute);
app.use('/api/v1/auth/', authRouter);
app.use(morgan(':method :url :response-time'));

app.set('port', process.env.PORT || 8080);


app.listen(app.get('port'), () => {
  console.log(`Action happening on port ${app.get('port')}`);
});

export default app;
