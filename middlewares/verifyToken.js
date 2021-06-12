const jwt = require("jsonwebtoken");

const tokenSecret = "verySecretValue";

const verifyJwtToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader==", authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, tokenSecret, (err, userName) => {
      if (err) {
        return res.sendStatus(403); //unauthorized
      }

      req.userName = userName;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = verifyJwtToken;
