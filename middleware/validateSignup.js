
const validateSignup = (req, res, next) => {
  const {
    fullname, gender, username, email, password,
  } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  const isValidEmail = emailRegex.test(email);
  if (!fullname && !gender && !username && !email && !password) {
    return res.status(401).json({
      success: false,
      message: 'Please fill out empty field!',
    });
  } if (gender === '') {
    return res.status(401).json({
      success: false,
      message: 'Please fill in your gender',
    });
  } if (!username) {
    return res.status(401).json({
      success: false,
      message: 'Enter your username',
    });
  } if (!isValidEmail) {
    return res.status(401).json({
      success: false,
      message: 'Enter valid Email',
    });
  }
  if (password === '') {
    return res.status(401).json({
      success: false,
      message: 'Enter your password',
    });
  } if (password.length < 6) {
    return res.status(401).json({
      success: false,
      message: 'Password must be more than 6 characters',
    });
  }

  next();
};

export default validateSignup;
