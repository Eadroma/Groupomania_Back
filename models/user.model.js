// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING(64),
        },
        token: {
            type: Sequelize.STRING,
            default: null,
        },
        posts: {
            type: Sequelize.JSON,
            allowNull: true
        },
        coverUrl: {
            type: Sequelize.STRING,
            defaultValue: 'https://caltrout.org/wp-content/uploads/2016/02/header-placeholder.jpg'
        },
        imgUrl: {
            type: Sequelize.STRING,
            defaultValue: 'https://image.shutterstock.com/image-vector/user-account-circle-profile-line-600w-272552858.jpg'
        },
        description: {
            type: Sequelize.STRING,
            defaultValue: 'No description yet.'
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
    return User;
}