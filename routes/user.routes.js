module.exports = (app) => {
  const userController = require("../controllers/user.controller");
  const auth = require("../middleware/auth");
  const router = require("express").Router();
  const multer = require("../middleware/multer");

  router.post("/create", userController.create);
  router.post("/login", userController.login);
  router.put("/:id/upload/cover", auth, multer, userController.uploadCover);
  router.put("/:id/upload/avatar", auth, multer, userController.uploadAvatar);
  router.get("/me", auth, userController.me);
  router.get("/:id", userController.findOne);
  router.put("/:id", auth, userController.update);
  router.delete("/:id", auth, userController.delete);
  router.get("/", userController.findAll);
  router.get("/:id/posts", userController.getAllPosts);
  app.use("/api/users", router);
};
