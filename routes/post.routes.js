module.exports = (app) => {
  const postController = require("../controllers/post.controller");
  const auth = require("../middleware/auth");
  const router = require("express").Router();
  const multer = require("../middleware/multer");

  router.post("/create", auth, multer, postController.create);
  router.get("/", postController.getAll);
  // router.post('/login', postController.login);
  // router.put('/:id/upload/cover', auth, multer, postController.uploadCover);
  // router.put('/:id/upload/avatar', auth, multer, postController.uploadAvatar);
  // router.get('/me', auth, postController.me);
  router.get("/:id", postController.getOne);
  router.post("/:id/like", auth, postController.like);
  // router.put('/:id', auth, postController.update);
  // router.delete('/:id', auth, postController.delete);
  // router.get('/', postController.findAll);
  app.use("/api/posts", router);
};
