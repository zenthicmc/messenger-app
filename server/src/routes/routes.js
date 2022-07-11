const express = require('express')
require('express-router-group')
const router = express.Router();
const userController = require('../controllers/userController');
const userValidator = require('../middlewares/validators/userValidator');
const multer = require('multer');
const randomstring = require('randomstring');

router.get('/', async (req, res) => {
    res.send("root");
})

// USER API GROUP
router.group('/api/user', router => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/users')
        },
        filename: function (req, file, cb) {
            cb(null, randomstring.generate(15) + '.' + file.mimetype.split('/')[1])
        }
    });

    const isImage = (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'), false);
        }
    }

    const upload = multer({ 
        storage: storage,
        fileFilter: isImage
    });

    // router.get('/user', userController.add);

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