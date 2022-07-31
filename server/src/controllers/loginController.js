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

        const compPassword = bcrypt.compare(req.body.password, data.password);
        if (!compPassword) {
            throw error;
        }

        const username = data.username;
        const email = data.email

        const accessToken = jwt.sign({ username, email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ username, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });

        await User.updateOne({ username }, { $set: { token: refreshToken } });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 1
        });

        return res.json({
            status: "success",
            message: "Login Success",
            data: {
                token: accessToken
            }
        })
    } catch (error) {
        return res.json({
            status: "fail",
            message: "Invalid username or password"
        })
    }
}

exports.logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.json({ message: 'User not logged in' });
        const user = await User.findOne({ token: refreshToken });
        if (!user || user == 'undefined') return res.json({ message: 'User not Found' });
        console.log(user.username);
        await User.updateOne({ username: user.username }, { $set: { token: '' } });
        res.clearCookie('refreshToken');
        return res.json({ message: 'User logged out' });
    } catch (error) {
        return res.json('Internal Server Error');
    }

}