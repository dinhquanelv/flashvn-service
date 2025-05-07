const express = require('express');
const router = express.Router();

const cardSubjectController = require('../controllers/cardSubject.controller');
const cardQuestionController = require('../controllers/cardQuestion.controller');
const requireAuth = require('../middleware/requireAuth');

router.post('/subjects', requireAuth, cardSubjectController.create);
router.get('/subjects', cardSubjectController.findAllByGroup);
router.get('/subjects/:id', cardSubjectController.findOne);
router.post('/subjects/search', cardSubjectController.search);
router.patch('/subjects/:id', requireAuth, cardSubjectController.update);
router.delete('/subjects/:id', requireAuth, cardSubjectController.remove);

router.post('/subjects/:subjectId/questions', requireAuth, cardQuestionController.create);
router.get('/subjects/:subjectId/questions', cardQuestionController.findAll);
router.get('/questions/:id', cardQuestionController.findOne);
router.post('/questions/search/:subjectId', cardQuestionController.search);
router.patch('/questions/:id', requireAuth, cardQuestionController.update);
router.delete('/questions/:id', requireAuth, cardQuestionController.remove);

module.exports = router;
