const express = require('express');
const postController = require('../../controller/post');
const router = express.Router();

router.post('/', postController.create);
router.get('/', postController.list);
router.get('/:id', postController.listById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;