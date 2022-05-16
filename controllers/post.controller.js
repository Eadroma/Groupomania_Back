const db = require("../models/index");
const { users, posts } = db;

exports.create = async (req, res) => {
  try {
    const img = req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null;
    const content = req.body.content;
    const user = req.user;
    const post = await posts.create({
      textContent: content,
      userName: user.name,
      userEmail: user.email,
      userId: user.id,
      imgUrl: img ? img : null,
    });
    res.status(201).json({
      message: "Post created successfully",
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while creating post",
      error: error,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const AllPosts = await posts.findAll({
      order: [["createdAt"]],
    });
    res.status(201).json({
      message: "Posts fetched successfully",
      posts: AllPosts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while fetching posts",
      error: error,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const post = await posts.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post)
      return res.status(404).json({
        message: "Post not found",
        error: "Post not found",
      });
    res.status(201).json({
      message: "Post fetched successfully",
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while fetching posts",
      error: error,
    });
  }
};

exports.like = async (req, res) => {
  try {
    console.log("pouet");
    const id = req.user.id;
    const post = await posts.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post)
      return res.status(404).json({
        message: "Post not found",
        error: "Post not found",
      });
    await posts.update(
      {
        userLiked: post.userLiked.includes(id)
          ? post.userLiked.filter((user) => user !== id)
          : [...post.userLiked, id],
        likes: post.userLiked.includes(id) ? post.likes - 1 : post.likes + 1,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      message: "Post liked successfully",
      like: post.userLiked.includes(id) ? "dislike" : "like",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while liking post",
      error: error,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const id = req.user.id;
    const post = await posts.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post)
      return res.status(404).json({
        message: "Post not found",
        error: "Post not found",
      });
    await posts.update(
      {
        comments: [
          ...post.comments,
          { userId: id, text: req.body.comment, date: new Date() },
        ],
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      message: "Comment added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while adding comment",
      error: error,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const img = req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null;
    const content = req.body.content;
    if (!content && !img)
      return res.status(400).json({
        message: "No content or image provided",
        error: "No content or image provided",
      });
    if (img) {
      await posts.update(
        {
          textContent: content,
          imgUrl: img,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
    } else {
      await posts.update(
        {
          textContent: content,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
    }
    const post = await posts.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "Post updated successfully",
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while updating post",
      error: error,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const post = await posts.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post)
      return res.status(404).json({
        message: "Post not found",
        error: "Post not found",
      });
    await posts.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while deleting post",
      error: error,
    });
  }
};
