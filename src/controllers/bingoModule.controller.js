const { isNotEmpty, isString, isObjectId, isArray } = require('../utils/validate');
const {
  createModule,
  findAllModule,
  findModule,
  searchModule,
  updateModule,
  removeModule,
} = require('../services/bingoModule.service');

const bingoModuleController = {
  // [POST] /api/bingo/modules
  create: async (req, res, next) => {
    try {
      const { title, keywords } = req.body;

      isNotEmpty(title, 'Title');
      isString(title, 'title');

      isNotEmpty(keywords, 'Keywords');
      isArray(keywords, 'keywords');

      const module = await createModule(title, keywords);

      return res.status(201).json(module);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /api/bingo/modules
  findAll: async (req, res, next) => {
    try {
      const modules = await findAllModule();

      return res.status(200).json(modules);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /api/bingo/modules/:id
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      isObjectId(id, 'id');
      const module = await findModule(id);

      return res.status(200).json(module);
    } catch (error) {
      next(error);
    }
  },

  // [POST] /api/bingo/modules/search
  search: async (req, res, next) => {
    try {
      const { query } = req.body;
      const modules = await searchModule(query);

      return res.status(200).json(modules);
    } catch (error) {
      next(error);
    }
  },

  // [PATCH] /api/bingo/modules/:id
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, keywords } = req.body;

      isNotEmpty(id, 'id');
      isObjectId(id, 'id');
      isString(title, 'title');
      isArray(keywords, 'keywords');

      const module = await updateModule(id, title, keywords);

      return res.status(200).json(module);
    } catch (error) {
      next(error);
    }
  },

  // [DELETE] /api/bingo/modules/:id
  remove: async (req, res, next) => {
    try {
      const { id } = req.params;

      isObjectId(id, 'id');
      await removeModule(id);

      return res.status(200).json({ message: 'Delete bingo module successfully!' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = bingoModuleController;
