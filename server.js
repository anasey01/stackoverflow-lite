import express from 'express';
import routes from './routes/route';
import authRouter from './routes/authRoute';

const app = express();

app.use('/api/v1', routes);
app.use('/auth/', authRouter);


app.set('port', process.env.PORT || 8080);


app.listen(app.get("port"), ()=>{
    console.log(`Action happening on port ${app.get("port")}`);
});

export default app;