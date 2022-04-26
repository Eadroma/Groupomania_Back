module.exports = app => {
    const userController = require('../controllers/user.controller');
    const auth = require('../middleware/auth');
    const router = require('express').Router();

    router.post('/create', userController.create);
    router.post('/login', userController.login);
    // router.get('/me', auth, userController.me);
    router.get('/:id', userController.findOne);
    router.put('/:id', auth, userController.update);
    router.delete('/:id', auth, userController.delete);
    router.get('/', userController.findAll);
    app.use('/api/users', router);
}