require('../../config/database');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) throw error;
        
        const user = await User.findOne({token: refreshToken});
        if(!user) throw error;

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if(err) throw error;

            const username = user.username;
            const email = user.email;
            const accessToken = jwt.sign({ username, email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
            
            return res.json({
                status: "success",
                message: "Login Success",
                data: {
                    token: accessToken
                }
            })
        })

    } catch (error) {
        console.log('Refresh Token Failed') 
        return res.status(403).json({});
    }
}