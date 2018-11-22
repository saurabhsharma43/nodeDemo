const express = require('express');
const router = express.Router();
const userRouter = require('./users.js');
const postRouter = require('./posts.js');
const commentRouter = require('./comments');
router.get('/', function(req, res, next) {
    // res.json({ success: true, data: null });
});

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);


module.exports = router;