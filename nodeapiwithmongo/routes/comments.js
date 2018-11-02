const express = require('express');
const commentController = require('../controllers/comment-controller');
const router = express.Router();

router.get('/', commentController.list);
router.post('/', commentController.commentCreate);
router.put('/:id', commentController.commentUpdate);
router.delete('/:id', commentController.commentDelete);



module.exports = router;