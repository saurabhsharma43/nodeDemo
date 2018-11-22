// const jwt = require('express-jwt');
// const User = require('../models/Users');
module.exports = function(req, res, next) {
    if (req.user.type === 'ADMIN') {
        next();
    }
    return res.status(401).json({ success: false, message: 'Invalid User' });
}