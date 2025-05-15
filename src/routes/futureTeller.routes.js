const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
const ftCardController = require('../controllers/ftCard.controller');
const ftSuggestController = require('../controllers/ftSuggest.controller');

// future teller card
router.post('/cards/', requireAuth, ftCardController.create);
router.get('/cards/group', ftCardController.findAllByGroup);
router.get('/cards/:id', ftCardController.findOne);
router.patch('/cards/:id', requireAuth, ftCardController.update);
router.delete('/cards/:id', requireAuth, ftCardController.remove);

// future teller suggest
router.post('/suggests/', requireAuth, ftSuggestController.create);
router.get('/suggests/', ftSuggestController.findAll);
router.get('/suggests/:id', ftSuggestController.findOne);
router.patch('/suggests/:id', requireAuth, ftSuggestController.update);
router.delete('/suggests/:id', requireAuth, ftSuggestController.remove);

module.exports = router;
