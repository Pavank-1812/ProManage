const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized user!",
      });
    }

    const verifiedToken = await jwt.verify(token, process.env.JWT_KEY);

    if (!verifiedToken) {
      return res.status(401).json({
        message: "Invalid token!",
      });
    }

    req.body.userId = verifiedToken.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token!",
      errorMessage: error.message,
    });
  }
};

module.exports = auth;
