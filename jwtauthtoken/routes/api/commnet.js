const express = require('express');
const router = express.Router();
const commentController = require('../../controller/comment');

router.post('/', commentController.createComment);
router.get('/', commentController.list);
router.get('/:id', commentController.listById);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);


module.exports = router;