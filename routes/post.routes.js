module.exports = (app) => {
  const postController = require("../controllers/post.controller");
  const auth = require("../middleware/auth");
  const router = require("express").Router();
  const multer = require("../middleware/multer");

  router.post("/create", auth, multer, postController.create);
  router.get("/", postController.getAll);
  router.get("/:id", postController.getOne);
  router.post("/:id/like", auth, postController.like);
  router.post("/:id/comment", auth, postController.addComment);
  app.use("/api/posts", router);
};
