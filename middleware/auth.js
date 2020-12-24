const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

const jwtSecret = process.env.JWT_SECRET;

// funcção middleware = vai proteger as rotas privadas
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // check if not token
  if (!token) {
    //401 non authorized
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token,  jwtSecret);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
