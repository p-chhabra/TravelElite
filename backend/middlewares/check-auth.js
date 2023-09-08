const HttpError = require("../modals/http-error");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const checkAuth = (req, res, next) => {
  //To Bypass default browser behaviour
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication Failed!", 401);
    return next(error);
  }
};

module.exports = checkAuth;
