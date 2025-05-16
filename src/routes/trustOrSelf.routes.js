const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
const trustOrSelfController = require('../controllers/tosQuestion.controller');

router.post('/', requireAuth, trustOrSelfController.create);
router.get('/', trustOrSelfController.findAll);
router.get('/:id', trustOrSelfController.findOne);
router.patch('/:id', requireAuth, trustOrSelfController.update);
router.delete('/:id', requireAuth, trustOrSelfController.remove);
router.patch('/trust/count/:id', trustOrSelfController.countTrust);
router.patch('/self/count/:id', trustOrSelfController.countSelf);

module.exports = router;
