require('../../config/database');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const data = await User.findOne({ username: req.body.username });

        if (!data) {
            throw error;
        }

        const compPassword = await bcrypt.compare(req.body.password, data.password);
        if (!compPassword) {
            res.json({ 
                status: 'fail',
                message: 'Wrong Password' 
            });
        }

        const username = data.username;
        const email = data.email

        const accessToken = jwt.sign({ username, email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ username, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });

        await User.updateOne({ username }, { $set: { token: refreshToken } });
        
        return res.json({
            status: "success",
            message: "Login Success",
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken,
            }
        })
    } catch (error) {
        return res.json({
            status: "fail",
            message: "Username not found"
        })
    }
}

exports.logout = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) return res.json({ status: 'fail', message: 'User not logged in' });
        const user = await User.findOne({ token: refreshToken });
        if (!user || user == 'undefined') return res.json({ status: "fail", message: "User not Found" });
        await User.updateOne({ username: user.username }, { $set: { token: '' } });
        return res.json({ status: "success", message: "User logged out" });
    } catch (error) {
        return res.json({status: "fail", message: 'Internal Server Error'});
    }

}