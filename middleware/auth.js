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
    jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
      if (error) {
        console.error(error);
        return res.status(401).json({
          message: "Invalid token.", // A garder en anglais ?
        });
      }
      const user = await User.findOne({
        where: {
          // @ts-ignore
          id: decodedToken.id,
        },
        attributes: {
          exclude: ["password"],
        },
      });
      if (!user) {
        return res.status(401).json({
          message: "Invalid User.", // A garder en anglais ?
        });
      }
      if (!req.user) req.user = user;
      next();
    });
  } catch (error) {
    console.error("error: " + error);
    console.log("middleware is crashing");
    res.status(500).json(error);
  }
};
