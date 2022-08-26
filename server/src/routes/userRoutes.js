const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const userExistsValidator = require('../middlewares/validators/userExistsValidator');
const loginController = require('../controllers/loginController');
const refreshToken = require('../controllers/refreshToken');
const loginValidator = require('../middlewares/validators/loginValidator');

// router.get('/', async (req, res) => {
//     res.send("root");
// })

// USER API GROUP
    router.get('/', userController.index);

    // Validation
    router.get('/username/:username', userExistsValidator.validateUsername);

    router.get('/email/:email', userExistsValidator.validateEmail);

    router.get('/verifytoken', loginValidator.verifyToken);

    // Controller
    router.get('/:id', userController.details);
    
    router.post('/', userController.store);

    router.put('/:id', userController.update);

    router.delete('/:id', userController.destroy);

    router.get('/:username/image', userController.viewImage);

    // Login
    router.post('/login', loginController.login)

    router.post('/refresh', refreshToken.refresh)

    router.post('/logout', loginController.logout)


// CHAT API GROUP
// router.group('api/user/chat', router => {
    
// })

module.exports = router