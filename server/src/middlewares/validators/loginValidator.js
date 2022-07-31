const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null || token == undefined) return res.json({ message: 'Token not found' });

        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
            if (err) return res.json({ message: 'Wrong user' });
            req.username = decoded.username;
            return res.json('Token verified');
            next();
        });
    } catch (error) {
        res.json('Internal Server Error');
    }

}