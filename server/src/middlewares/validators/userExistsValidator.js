require('../../../config/database');
const User = require('../../models/User');
const { body, check, validationResult } = require('express-validator');

exports.validateUsername = async (req, res, next) => {
    body('username').custom(async (username) => {
        const data = await User.findOne({ username: username });

        if (data) {
            return res.json({ status: 'fail', message: 'Username Sudah Terdaftar' });
        }

        return res.json({ status: 'success', message: 'Username Dapat Digunakan' });
    })


}

exports.validateEmail = check('email', 'Email Tidak Valid').isEmail, async (req, res, next) => {
    const data = await User.findOne({ email: req.params.email });

    if (data) {
        return res.json({ status: 'fail', message: 'Email Sudah Terdaftar' });
    }

    return res.json({ status: 'success', message: 'Email Dapat Digunakan' });

}

// exports.validateEmail = async (req, res, next) => {
//     const data = await User.findOne({ email: req.params.email });

//     if (data) {
//         return res.json({ status: 'fail', message: 'Email Sudah Terdaftar' });
//     }

//     return res.json({ status: 'success', message: 'Email Dapat Digunakan' });
// }