const jwt = require('jsonwebtoken');
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
/* 
verifyToken is a middleware function that is used 
to verify the JWT sent by the client if it is valid 
or not and pass the decoded payload and user id to 
the next middleware function if the token is valid. 
If the token is invalid or expired, it sends a 401 
(Unauthorized) response to the client.
*/
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