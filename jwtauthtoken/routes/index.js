const express = require('express');
const router = express.Router();
const passportMiddleware = require('../config/passport');
const jwtAuthRequired = passportMiddleware.authenticate('jwt', { session: false });
router.get('/', function(req, res, next) {
    // res.json({ success: true, data: null });
});

router.use('/users', require('./api/users'));
router.use('/posts', jwtAuthRequired, require('./api/post'));
router.use('/comments', jwtAuthRequired, require('./api/commnet'));

module.exports = router;