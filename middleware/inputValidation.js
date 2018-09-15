
class Validation {
  static signup(req, res, next) {
    req.check('fullname').notEmpty().withMessage('Fullname is required').isString()
      .withMessage('Enter a string');

    req.check('gender').notEmpty().withMessage('Select your gender from the option');

    req.check('username').notEmpty().withMessage('Enter a username')
      .isLength({ max: 10 })
      .withMessage('Username cannot be more than 10 characters');

    req.check('password').notEmpty().withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be a minimum of 6 characters');

    req.check('email').notEmpty('Email is required').isEmail().withMessage('Enter a valid email address');

    const errors = req.validationErrors();
    if (errors) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Signup information',
        errors,
      });
    }
    next();
  }

  static login(req, res, next) {
    req.check('username').notEmpty().withMessage('Username required to Login');
    req.check('password').notEmpty().withMessage('Password is required to login');

    const errors = req.validationErrors();
    if (errors) {
      return res.status(401).json({
        success: false,
        message: 'Invalid login information',
        errors,
      });
    }
    next();
  }
}

export default Validation;
