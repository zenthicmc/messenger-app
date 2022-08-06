require('../../config/database');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.refresh = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        if(!refreshToken) throw error;
        
        const user = await User.findOne({token: refreshToken});
        if(!user) return res.json({ status: 'fail', message: 'Token not found' });

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if(err) throw error;

            const username = user.username;
            const email = user.email;
            const accessToken = jwt.sign({ username, email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
            
            return res.json({
                status: "success",
                message: "Login Success",
                data: {
                    accessToken: accessToken
                }
            })
        })

    } catch (error) {
        return res.json({ status: "fail", message: "Invalid Token" });
    }
}