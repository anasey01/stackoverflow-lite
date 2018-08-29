import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
  const tokenHeader = req.header('x-auth-token');
  if (!tokenHeader) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }
  try {
    const decoded = jwt.verify(tokenHeader, process.env.PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Invalid token.',
    });
  }
};

export default validateToken;
