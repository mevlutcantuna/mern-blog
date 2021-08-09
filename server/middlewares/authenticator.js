const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;

  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) next([401, "Invalid token"]);
      else {
        req.decodedToken = decodedToken;
        req.token = token;
        next();
      }
    });
  } else next([400, "Token is missing"]);
};
