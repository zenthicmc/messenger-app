const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null || token == undefined)
            return res.json({
               status: "fail",
               message: "Token not found",
            });

        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
            if (err) return res.json({ 
                status: 'fail',
                message: 'Wrong user' 
            });

            if (req.body.username != decoded.username) return res.json({ 
                status: 'fail',
                message: 'Wrong user' 
            });
            
            return res.json({
                status: 'success',
                message: 'Token verified'
            });
        });
    } catch (error) {
       return res.json({
            status: 'fail',
            message: 'Token not found'
        });
    }
};