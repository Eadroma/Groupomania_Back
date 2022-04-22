const {
    DataTypes
} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    const Post = sequelize.define('posts', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        textContent: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
        },
        userEmail: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imgUrl: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        userLiked: {
            type: DataTypes.JSON,
            defaultValue: {},
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        comments: {
            type: DataTypes.JSON,
            defaultValue: [],
        },
        date: {
            type: DataTypes.STRING,
        }
    });
    return Post;
};