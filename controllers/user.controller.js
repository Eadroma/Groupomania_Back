const db = require('../models/index');
const User = db.users;
const Post = db.posts;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create and Save a new User
exports.create = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        // error handling
        if (!(email && password)) {
            return res.status(400).send({
                message: 'Please fill all the fields' // A garder en anglais ?
            });
        }

        const oldUser = await User.findAll({
            where: {
                email: email
            }
        });
        if (oldUser.length > 0)
            return res.status(400).json({
                message: 'User already exists' // A garder en anglais ?
            });

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name: email.split('@')[0],
            email: email,
            password: hashedPassword
        });

        // create token
        const token = jwt.sign({
            id: newUser.id,
            isAdmin: newUser.isAdmin
        }, process.env.JWT_KEY, {
            expiresIn: "4h"
        });
        // add token to our new user
        await User.update({
            token: token
        }, {
            where: {
                id: newUser.id
            }
        });
        res.status(201).json({
            message: 'User created successfully',
            token: token
        });
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
}

// Login a user
exports.login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        // error handling

        if (!(email && password)) {
            return res.status(400).send({
                message: 'Please fill all the fields' // A garder en anglais ?
            });
        }
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if (!user)
            return res.status(400).send({
                message: 'User does not exist' // A garder en anglais ?
            });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(400).send({
                message: 'Invalid password' // A garder en anglais ?
            });

        // create token
        const token = jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin
        }, process.env.JWT_KEY, {
            expiresIn: "4h"
        });
        // add token to our new user
        await User.update({
            token: token
        }, {
            where: {
                id: user.id
            }
        });
        res.status(201).send({
            message: 'User logged in successfully',
            token: token
        });

    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
}

// find one user
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({
            where: {
                id: id
            },
            attribute: {
                exclude: ['password']
            }
        });

        if (!user)
            return res.status(404).send({
                message: 'User not found' // A garder en anglais ?
            });

        return res.status(200).send(user);
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
}

// find all users
exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password', 'token']
            }
        });

        if (!users)
            return res.status(404).send({
                message: 'Users not found' // A garder en anglais ?
            });

        return res.status(200).send(users.reverse());
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
}
exports.uploadAvatar = async (req, res) => {
    try {
        const img = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        await User.update({
            imgUrl: img
        }, {
            where: {
                id: req.user.id
            }
        });
        const user = await User.findByPk(req.user.id, {
            attributes: {
                exclude: ['password', 'token']
            }
        });
        return res.status(200).send({
            message: 'User updated successfully',
            user: user
        });
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
}
exports.uploadCover = async (req, res) => {
    try {
        const img = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        await User.update({
            coverUrl: img
        }, {
            where: {
                id: req.user.id
            }
        });
        const user = await User.findByPk(req.user.id, {
            attributes: {
                exclude: ['password', 'token']
            }
        });
        return res.status(200).send({
            message: 'User updated successfully',
            user: user
        });

    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
}
exports.upload = async (req, res) => {
    try {
        const imgType = req.params.imgType;
        const img = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        await User.update({
            [imgType]: img
        }, {
            where: {
                id: req.user.id
            }
        });
        return res.status(200).send({
            message: 'User updated successfully',
            user: user
        });

    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
}
// update a user
exports.update = async (req, res) => {
    try {
        const id = req.user.id;
        const data = req.body;

        for (let key of Object.keys(data)) {
            if (!data[key]) {
                delete data[key];
            } else {
                await User.update({
                    [key]: data[key]
                }, {
                    where: {
                        id: id
                    }
                })
            }
        }
        const user = await User.findByPk(id);
        return res.status(200).send({
            message: 'User updated successfully',
            user: user
        });

    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
}

// delete a user
exports.delete = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user)
            return res.status(404).send({
                message: 'User not found' // A garder en anglais ?
            });

        await User.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.status(200).send({
            message: 'User deleted successfully' // A garder en anglais ?
        });
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
}

exports.me = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id
            },
            attributes: {
                exclude: ['password']
            }
        });

        if (!user)
            return res.status(404).send({
                message: 'User not found' // A garder en anglais ?
            });

        return res.status(200).send(user);
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
}