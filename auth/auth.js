import express from 'express';
import bodyParser from 'body-parser';
import dbManager from '../model/dbManager';

const authRouter = express.Router();


// parse application/x-www-form-urlencoded
authRouter.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
authRouter.use(bodyParser.json());

// PATHS are pre pended with /auth/
authRouter.get('/', (req, res) => {
  res.json({
    message: 'successful',
  });
});

authRouter.post('/signup', (req, res, next) => {
  // Check if email is valid && Check if password is valid
  if (validUser(req.body)) {
    dbManager.selectUserByEmail(req.body.email, (result) => {
      if (!result) {
        // Hash Password Here Before Inserting into Database.
        let data = {
          fullname: req.body.fullname,
          username: req.body.username,
          gender: req.body.gender,
          password: req.body.password,
          email: req.body.email,
        };
        dbManager.insertUser(req.body.fullname, req.body.username, req.body.gender, req.body.password, req.body.email, (err, result) => {
          console.log('Error', err, 'Result', result);
          res.json(result);
        });
      } else {
        res.json('Username or Password incorrect!');
      }
    });
  } else {
    next(new Error('Invalid User'));
  }
});

const validUser = (user) => {
  const valideEmail = typeof user.email === 'string' && user.email.trim() !== '';
  const validPassword = typeof user.password === 'string' && user.password.trim() !== '' && user.password.trim().length >= 6;
  return valideEmail && validPassword;
};

export default authRouter;
