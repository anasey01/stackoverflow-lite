import express from 'express';
import routes from './routes/route';
import authRouter from './auth/auth';

const app = express();

// USE ROUTES
app.use('/api/v1', routes);
app.use('/auth', authRouter);

// 404 Error Handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

// Set Up PORT
app.set('port', process.env.PORT || 8080);

// Start up Server to listen on PORT
app.listen(app.get('port'), () => {
  console.log(`Action happening on port ${app.get('port')}`);
});

export default app;
