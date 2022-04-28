// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING(64),
        },
        token: {
            type: DataTypes.STRING,
            default: null,
        },
        coverUrl: {
            type: DataTypes.STRING,
            defaultValue: 'https://caltrout.org/wp-content/uploads/2016/02/header-placeholder.jpg'
        },
        imgUrl: {
            type: DataTypes.STRING,
            defaultValue: 'https://image.shutterstock.com/image-vector/user-account-circle-profile-line-600w-272552858.jpg'
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: 'No description yet.'
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return User;
}