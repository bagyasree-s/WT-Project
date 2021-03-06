const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');
    // Check if no token
    if (!token) {
        return res.status(401).json({
            msg: 'no token, authorization denied!'
        });
    }
    // Verify token
    // try {
    //     const decoded = jwt.verify(token, config.get('jetSecret'));
    //     req.user = decoded.user;
    //     next();
    // } catch (err) {
    //     res.status(401).json({
    //         msg: 'Token is not Valid'
    //     });
    // }
    try {
        jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
            if (error) {
                res.status(401).json({
                    msg: 'Token is not valid'
                });
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } catch (err) {
        console.error('something wrong with auth middleware');
        res.status(500).json({
            msg: 'Server Error'
        });
    }
}