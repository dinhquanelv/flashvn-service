const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
const bingoModuleController = require('../controllers/bingoModule.controller');
const bingoQuestionController = require('../controllers/bingoQuestion.controller');
const bingoController = require('../controllers/bingo.controller');

router.post('/modules', requireAuth, bingoModuleController.create);
router.get('/modules', bingoModuleController.findAll);
router.get('/modules/:id', bingoModuleController.findOne);
router.post('/modules/search', bingoModuleController.search);
router.patch('/modules/:id', requireAuth, bingoModuleController.update);
router.delete('/modules/:id', requireAuth, bingoModuleController.remove);

router.post('/modules/:moduleId', requireAuth, bingoQuestionController.create);
router.get('/modules/:moduleId', bingoQuestionController.findAll);
router.get('/modules/:id', bingoQuestionController.findOne);
router.post('/modules/search', bingoQuestionController.search);
router.patch('/modules/:id', requireAuth, bingoQuestionController.update);
router.delete('/modules/:id', requireAuth, bingoQuestionController.remove);

router.post('/generate/:moduleId', requireAuth, bingoController.generate);
router.get('/:moduleId/:index', bingoController.findOne);
router.get('/download/pdf/:moduleId', bingoController.downloadPDF);

module.exports = router;
