const jwt = require("jsonwebtoken");
const secret = "123456";
const generateToken = (payload) => {
  return jwt.sign(payload, secret);
};
const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  try {
    if (!authorization) {
      return res.status(401).send({ error: "No token provided" });
    }
    console.log("yaha enter hua h");
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "cant access token" });
    }
    // console.log(token);
    const decode = jwt.verify(token, secret);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(500).send({ error: "Internal server Error" });
  }
};
module.exports = { generateToken, jwtAuthMiddleware };
