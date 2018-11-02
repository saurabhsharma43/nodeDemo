const express = require('express');
const postController = require('../controllers/post-controller');
const router = express.Router();

router.get('/', postController.list);
router.post('/', postController.postCreate);
router.put('/:id', postController.postUpdate);
router.delete('/:id', postController.postDelete);

module.exports = router;