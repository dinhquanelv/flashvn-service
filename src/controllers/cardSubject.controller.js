const { isNotEmpty, isString, isObjectId, isFieldsNotEmpty } = require('../utils/validate');
const { create, findAllByGroup, findOne, search, update, remove } = require('../services/cardSubject.service');

const cardSubjectController = {
  // [POST] /api/v1/card/subjects
  create: async (req, res, next) => {
    try {
      const { title, group } = req.body;

      isNotEmpty(title, 'title');
      isString(title, 'title');

      isNotEmpty(group, 'group');
      isString(group, 'group');

      const subject = await create(title, group);

      return res.status(200).json(subject);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /api/v1/card/subjects
  findAllByGroup: async (req, res, next) => {
    try {
      const { group } = req.query;

      isNotEmpty(group, 'group');
      isString(group, 'group');

      const subjects = await findAllByGroup(group);

      return res.status(200).json(subjects);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /api/v1/card/subjects/:id
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      isNotEmpty(id, 'id');
      isObjectId(id, 'id');

      const subject = await findOne(id);

      return res.status(200).json(subject);
    } catch (error) {
      next(error);
    }
  },

  // [POST] /api/v1/card/subjects/search
  search: async (req, res, next) => {
    try {
      const { title, group } = req.body;

      isString(title, 'title');
      isNotEmpty(group, 'group');
      isString(group, 'group');

      const subjects = await search(title, group);

      return res.status(200).json(subjects);
    } catch (error) {
      next(error);
    }
  },

  // [PATCH] /api/v1/card/subjects/:id
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, group } = req.body;

      isObjectId(id, 'id');
      isFieldsNotEmpty([title, 'title'], [group, 'group']);
      isString(title, 'title');
      isString(group, 'group');

      const subject = await update(id, title, group);

      return res.status(200).json(subject);
    } catch (error) {
      next(error);
    }
  },

  // [DELETE] /api/v1/card/subjects/:id
  remove: async (req, res, next) => {
    try {
      const { id } = req.params;

      isNotEmpty(id, 'id');
      isObjectId(id, 'id');

      await remove(id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = cardSubjectController;
