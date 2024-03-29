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
            return res.json({ 
                status: 'fail',
                message: 'Wrong Password' 
            });
        }

        const id = data._id;
        const username = data.username;
        const email = data.email

        const accessToken = jwt.sign({ id, username, email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id, username, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });

        await User.updateOne({ username }, { $set: { token: refreshToken } });

        // res.cookie('refreshToken', refreshToken,{
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000
        // });
        
        return res.json({
            status: "success",
            message: "Login Success",
            data: {
                userId: data._id,
                accessToken: accessToken,
                refreshToken: refreshToken,
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
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) return res.json({ status: 'fail', message: 'User not logged in' });
        const user = await User.findOne({ token: refreshToken });
        if (!user || user == 'undefined') return res.json({ status: "success", message: "User not Found" });
        await User.updateOne({ username: user.username }, { $set: { token: '' } });
        return res.json({ status: "success", message: "User logged out" });
    } catch (error) {
        return res.json({status: "fail", message: 'Internal Server Error'});
    }

}