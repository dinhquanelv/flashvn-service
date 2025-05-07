const { isNotEmpty, isString, isObjectId, isFieldsNotEmpty, isArray } = require('../utils/validate');
const { create, findAll, findOne, search, update, remove } = require('../services/cardQuestion.service');

const cardQuestionController = {
  // [POST] /api/v1/card/subjects/:subjectId/questions
  create: async (req, res, next) => {
    try {
      const { subjectId } = req.params;
      const { title, correctAnswer, wrongAnswers } = req.body;

      isObjectId(subjectId, 'subjectId');
      isFieldsNotEmpty([title, 'title'], [correctAnswer, 'correctAnswer'], [wrongAnswers, 'wrongAnswers']);
      isString(title, 'title');
      isString(correctAnswer, 'correctAnswer');
      isArray(wrongAnswers, 'wrongAnswers');

      const question = await create(subjectId, title, correctAnswer, wrongAnswers);

      return res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /api/v1/card/subjects/:subjectId/questions
  findAll: async (req, res, next) => {
    try {
      const { subjectId } = req.params;
      isObjectId(subjectId, 'subjectId');

      const questions = await findAll(subjectId);

      return res.status(200).json(questions);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /api/v1/card/questions/:id
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      isObjectId(id, 'id');

      const question = await findOne(id);

      return res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  },

  // [POST] /api/v1/card/questions/search/:subjectId
  search: async (req, res, next) => {
    try {
      const { subjectId } = req.params;
      const { query } = req.body;

      isObjectId(subjectId, 'subjectId');
      isString(query, 'query');

      const questions = await search(subjectId, query);

      return res.status(200).json(questions);
    } catch (error) {
      next(error);
    }
  },

  // [PATCH] /api/v1/card/questions/:id
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, correctAnswer, wrongAnswers } = req.body;

      isFieldsNotEmpty([title, 'title'], [correctAnswer, 'correctAnswer'], [wrongAnswers, 'wrongAnswers']);
      isObjectId(id, 'id');
      isString(title, 'title');
      isString(correctAnswer, 'correctAnswer');
      isArray(wrongAnswers, 'wrongAnswers');

      const question = await update(id, title, correctAnswer, wrongAnswers);

      return res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  },

  // [DELETE] /api/v1/card/questions/:id
  remove: async (req, res, next) => {
    try {
      const { id } = req.params;
      isObjectId(id, 'id');

      await remove(id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = cardQuestionController;
