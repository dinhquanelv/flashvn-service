const { isNotEmpty, isFieldsNotEmpty, isString, isArray, isObjectId } = require('../utils/validate');
const {
  createQuestion,
  findAllQuestion,
  findOneQuestion,
  searchQuestion,
  updateQuestion,
  removeQuestion,
} = require('../services/bingoQuestion.service');

const bingoQuestionController = {
  // [POST] /api/bingo/modules/:moduleId/questions
  create: async (req, res, next) => {
    try {
      const { moduleId } = req.params;
      const { keyword, title, correctAnswer, wrongAnswers } = req.body;

      isFieldsNotEmpty(
        [moduleId, 'moduleId'],
        [keyword, 'keyword'],
        [title, 'title'],
        [correctAnswer, 'correctAnswer'],
        [wrongAnswers, 'wrongAnswers'],
      );
      isObjectId(moduleId, 'moduleId');
      isString(keyword, 'keyword');
      isString(title, 'title');
      isString(correctAnswer, 'correctAnswer');
      isArray(wrongAnswers, 'wrongAnswers');

      const question = await createQuestion(moduleId, keyword, title, correctAnswer, wrongAnswers);

      return res.status(201).json(question);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /api/bingo/modules/:moduleId/questions
  findAll: async (req, res, next) => {
    try {
      const { moduleId } = req.params;

      isObjectId(moduleId, 'moduleId');

      const questions = await findAllQuestion(moduleId);

      return res.status(200).json(questions);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /api/bingo/questions/:id
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      isObjectId(id, 'id');

      const question = await findOneQuestion(id);

      return res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  },

  // [POST] /api/bingo/questions/search
  search: async (req, res, next) => {
    try {
      const { query } = req.body;
      const questions = await searchQuestion(query);

      return res.status(200).json(questions);
    } catch (error) {
      next(error);
    }
  },

  // [PATCH] /api/bingo/questions/:id
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { keyword, title, correctAnswer, wrongAnswers } = req.body;

      isFieldsNotEmpty(
        [id, 'id'],
        [keyword, 'keyword'],
        [title, 'title'],
        [correctAnswer, 'correctAnswer'],
        [wrongAnswers, 'wrongAnswers'],
      );
      isObjectId(id, 'id');
      isString(keyword, 'keyword');
      isString(title, 'title');
      isString(correctAnswer, 'correctAnswer');
      isArray(wrongAnswers, 'wrongAnswers');

      const question = await updateQuestion(id, keyword, title, correctAnswer, wrongAnswers);

      return res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  },

  // [DELETE] /api/bingo/questions/:id
  remove: async (req, res, next) => {
    try {
      const { id } = req.params;

      isNotEmpty(id, 'id');
      isObjectId(id, 'id');

      await removeQuestion(id);

      return res.status(200).json({ message: 'Delete question successfully!' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = bingoQuestionController;
