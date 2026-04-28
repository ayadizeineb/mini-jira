const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: 'no token' });
  }
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secret123');
    req.user = decoded; // decoded contains userId
    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
};
