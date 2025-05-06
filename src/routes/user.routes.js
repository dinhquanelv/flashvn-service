const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const requireAuth = require('../middleware/requireAuth');

router.get('', requireAuth, userController.findAll);
router.get('/:id', requireAuth, userController.findOne);
router.post('/:id', requireAuth, userController.resetPassword);

module.exports = router;
