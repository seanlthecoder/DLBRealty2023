const jwt = require('jsonwebtoken');
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  // Get the token from the header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If no token, send 401 (Unauthorized) response
  if (!token) {
    return res.sendStatus(401);
  }
  // Verify the token using the secret key
  jwt.verify(token, jwt_secret, (err, decoded) => {
    // If token is invalid or expired, send 403 (Forbidden) response
    if (err) {
      return res.sendStatus(403);
    }
    // If token is valid, set the req.auth to the decoded payload and call next
    req.auth = decoded;
    req.id = decoded.id;
    next();
  });
};

module.exports = verifyToken;