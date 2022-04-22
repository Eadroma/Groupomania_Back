const jwt = require('jsonwebtoken');
const db = require('../models/index');
const User = db.users;

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                message: 'No token provided.' // A garder en anglais ?
            });
        }
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const user = await User.findOne({
            where: {
                id: decodedToken.id
            }
        });
        if (!user)
            return res.status(401).json({
                message: 'Invalid token.' // A garder en anglais ?
            });
        else {
            req.user = user;
            if (decodedToken.isAdmin)
                next();
            if (req.params.id !== user.id) {
                return res.status(403).json({
                    message: 'You are not authorized to perform this action.' // A garder en anglais ?
                });
            }
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}