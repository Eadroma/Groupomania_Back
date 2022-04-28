const {
    Sequelize,
    DataTypes
} = require('sequelize');
// import env variables
require('dotenv').config();

// create sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('./user.model')(sequelize, DataTypes);
db.posts = require('./post.model')(sequelize, DataTypes);
// db.comment = require('./comment.model')(sequelize, Sequelize);

module.exports = db;