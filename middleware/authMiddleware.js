const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token after 'Bearer'
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded payload to `req.user`
    next();
  } catch (err) {
    console.error('Token validation error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
