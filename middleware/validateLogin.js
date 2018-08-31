
const validateLogin = (req, res, next) => {
  const {username, password } = req.body;
  if (!username && !password) {
    return res.status(401).json({
      success: false,
      message: 'username or password required',
    });
  } if (password.length < 6) {
    return res.status(401).json({
      success: false,
      message: 'Password must be at least 6 characters',
    });
  }
  next();
};

export default validateLogin;
