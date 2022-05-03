const db = require('../models/index');
const {
    users,
    posts
} = db;


exports.create = async (req, res) => {
    try {
        const img = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
        const content = req.body.content;
        const user = req.user;
        console.log(img);
        const post = await posts.create({
            textContent: content,
            userName: user.name,
            userEmail: user.email,
            userId: user.id,
            imgUrl: img ? img : null,
        });
        res.status(201).json({
            message: 'Post created successfully',
            post: post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error while creating post',
            error: error
        });
    }
}

exports.getAll = async (req, res) => {
    try {
        const AllPosts = await posts.findAll({
            order: [
                ['createdAt']
            ]
        });
        res.status(201).json({
            message: 'Posts fetched successfully',
            posts: AllPosts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error while fetching posts',
            error: error
        });
    }
}