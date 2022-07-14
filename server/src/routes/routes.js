const express = require('express')
require('express-router-group')
const router = express.Router();
const userController = require('../controllers/userController');
const userValidator = require('../middlewares/validators/userValidator');

// router.get('/', async (req, res) => {
//     res.send("root");
// })

// USER API GROUP
router.group('/api/user', router => {

    router.get('/', userController.index);

    // Validation
    router.get('/username/:username', userValidator.validateUsername);

    router.get('/email/:email', userValidator.validateEmail);

    // Controller
    router.get('/:username', userController.details);
    
    router.post('/', userController.store);

    router.put('/:username', userController.update);

    router.delete('/:username', userController.destroy);

    router.get('/:username/image', userController.viewImage);
});

module.exports = { router }