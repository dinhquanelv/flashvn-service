const { isNotEmpty, isString, isObjectId } = require('../utils/validate');
const { create, findAll, findOne, update, remove, countTrust, countSelf } = require('../services/tosQuestion.service');

const tosQuestionController = {
  // [POST] /api/trust-or-self
  create: async (req, res, next) => {
    try {
      const { content, trustTitle, selfTitle } = req.body;

      isNotEmpty(content, 'Content');
      isString(content, 'Content');

      isNotEmpty(trustTitle, 'Trust Title');
      isString(trustTitle, 'Trust Title');

      isNotEmpty(selfTitle, 'Self Title');
      isString(selfTitle, 'Self Title');

      const question = await create(content, trustTitle, selfTitle);

      return res.status(201).json(question);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /api/trust-or-self
  findAll: async (req, res, next) => {
    try {
      const questions = await findAll();

      return res.status(200).json(questions);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /api/trust-or-self/:id
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      isObjectId(id, 'Id');

      const question = await findOne(id);

      return res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  },

  // [PATCH] /api/trust-or-self/:id
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { content, trustTitle, selfTitle } = req.body;

      isObjectId(id, 'Id');

      isNotEmpty(content, 'Content');
      isString(content, 'Content');

      isNotEmpty(trustTitle, 'Trust Title');
      isString(trustTitle, 'Trust Title');

      isNotEmpty(selfTitle, 'Self Title');
      isString(selfTitle, 'Self Title');

      const question = await update(id, content, trustTitle, selfTitle);

      return res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  },

  // [DELETE] /api/trust-or-self/:id
  remove: async (req, res, next) => {
    try {
      const { id } = req.params;
      isObjectId(id, 'Id');

      await remove(id);

      return res.status(200).json({ message: 'Delete Trust or Self question successfully!' });
    } catch (error) {
      next(error);
    }
  },

  countTrust: async (req, res, next) => {
    try {
      const { id } = req.params;
      isObjectId(id, 'Id');

      const counted = await countTrust(id);

      return res.json(counted);
    } catch (error) {
      next(error);
    }
  },

  countSelf: async (req, res, next) => {
    try {
      const { id } = req.params;
      isObjectId(id, 'Id');

      const counted = await countSelf(id);

      return res.json(counted);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = tosQuestionController;
