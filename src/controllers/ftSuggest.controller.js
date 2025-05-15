const { isNotEmpty, isString, isObjectId } = require('../utils/validate');
const { create, findAll, findOne, update, remove } = require('../services/ftSuggest.service');

const ftSuggestController = {
  // [POST] /api/future-teller/suggests
  create: async (req, res, next) => {
    try {
      const { step, time, title, content, suggest, emoji } = req.body;

      isNotEmpty(step, 'Step');
      isString(step, 'Step');

      isNotEmpty(time, 'Time');
      isString(time, 'Time');

      isNotEmpty(title, 'Title');
      isString(title, 'Title');

      isNotEmpty(content, 'Content');
      isString(content, 'Content');

      isNotEmpty(suggest, 'Suggest');
      isString(suggest, 'Suggest');

      isString(emoji, 'Emoji');

      const newSuggest = await create(step, time, title, content, suggest, emoji);

      return res.status(201).json(newSuggest);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /api/future-teller/suggests
  findAll: async (req, res, next) => {
    try {
      const suggests = await findAll();
      return res.status(200).json(suggests);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /api/future-teller/suggests/:id
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      isObjectId(id, 'Id');

      const suggest = await findOne(id);
      return res.status(200).json(suggest);
    } catch (error) {
      next(error);
    }
  },

  // [PATCH] /api/future-teller/suggests/:id
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { step, time, title, content, suggest, emoji } = req.body;

      isObjectId(id, 'Id');
      isNotEmpty(step, 'Step');
      isString(step, 'Step');
      isNotEmpty(time, 'Time');
      isString(time, 'Time');
      isNotEmpty(title, 'Title');
      isString(title, 'Title');
      isNotEmpty(content, 'Content');
      isString(content, 'Content');
      isNotEmpty(suggest, 'Suggest');
      isString(suggest, 'Suggest');
      isString(emoji, 'Emoji');

      const updatedSuggest = await update(id, step, time, title, content, suggest, emoji);
      return res.status(200).json(updatedSuggest);
    } catch (error) {
      next(error);
    }
  },

  // [DELETE] /api/future-teller/suggests/:id
  remove: async (req, res, next) => {
    try {
      const { id } = req.params;
      isObjectId(id, 'Id');

      await remove(id);
      return res.status(200).json({ message: 'Delete Future Teller suggest successfully!' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ftSuggestController;
