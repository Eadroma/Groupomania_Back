const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = db.users;

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token || token == "null") {
      return res.status(401).json({
        message: "No token provided.", // A garder en anglais ?
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({
      where: {
        id: decodedToken.id,
      },
    });
    if (!user)
      return res.status(401).json({
        message: "Invalid token.", // A garder en anglais ?
      });
    else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
