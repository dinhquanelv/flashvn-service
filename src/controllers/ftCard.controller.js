const { isNotEmpty, isString, isObjectId } = require('../utils/validate');
const { create, findAllByGroup, findOne, update, remove } = require('../services/ftCard.service');

const ftCardController = {
  // [POST] /api/future-teller/cards
  create: async (req, res, next) => {
    try {
      const { title, group, image } = req.body;
      isNotEmpty(title, 'Title');
      isString(title, 'Title');

      isNotEmpty(group, 'Group');
      isString(group, 'Group');

      isNotEmpty(image, 'Image');
      isString(image, 'Image');

      const card = await create(title, group, image);

      return res.status(201).json(card);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /api/future-teller/cards/group?query=
  findAllByGroup: async (req, res, next) => {
    try {
      const { query } = req.query;

      isNotEmpty(query, 'query');
      isString(query, 'query');

      const cards = await findAllByGroup(query);

      return res.status(200).json(cards);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /api/future-teller/cards/:id
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      isObjectId(id, 'Id');

      const card = await findOne(id);

      return res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  },

  // [PATCH] /api/future-teller/cards/:id
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, group, image } = req.body;

      isObjectId(id, 'Id');

      isNotEmpty(title, 'Title');
      isString(title, 'Title');

      isNotEmpty(group, 'Group');
      isString(group, 'Group');

      isNotEmpty(image, 'Image');
      isString(image, 'Image');

      const card = await update(id, title, group, image);

      return res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  },

  // [DELETE] /api/future-teller/cards/:id
  remove: async (req, res, next) => {
    try {
      const { id } = req.params;

      isObjectId(id, 'Id');

      await remove(id);

      return res.status(200).json({ message: 'Delete Future Teller card successfully!' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ftCardController;
