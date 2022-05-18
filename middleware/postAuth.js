const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = db.users;
const Post = db.posts;

module.exports = async (req, res, next) => {
  try {
    // check if a params id exists
    if (!req.params.id) {
      return res.status(401).json({
        message: "No id provided.",
      });
    }
    // check if a token exists
    const token = req.headers.authorization;
    if (!token || token == "null") {
      return res.status(401).json({
        message: "No token provided.", // A garder en anglais ?
      });
    }
    // check if the token is valid
    jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token.", // A garder en anglais ?
        });
      }
      // check if the user exists
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
      // check if the user is an admin
      // @ts-ignore
      if (decodedToken.isAdmin) {
        if (!req.user) req.user = user;
        next();
      }

      // check if the user is the owner of the post
      const post = await Post.findOne({
        where: {
          // @ts-ignore
          id: req.params.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (!post) {
        return res.status(401).json({
          message: "Invalid Post.", // A garder en anglais ?
        });
      }
      console.log(6);
      if (post.userId == user.id) {
        req.user = user;
        next();
      } else {
        return res.status(401).json({
          message: "Invalid User.", // A garder en anglais ?
        });
      }
    });
  } catch (error) {
    console.error("error: " + error);
    console.log("middleware is crashing");
    res.status(500).json(error);
  }
};
