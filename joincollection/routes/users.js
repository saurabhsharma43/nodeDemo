const express = require('express');
const userController = require('../controller/user');
const router = express.Router();


router.post('/', userController.create);
router.get('/', userController.list);
router.get('/:id', userController.listById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;