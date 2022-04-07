const config = require("config");
const jwt = require("jsonwebtoken");

const auth = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send("Access denied.no token provied..");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};


module.exports=auth;
