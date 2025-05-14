const { isObjectId, isString, isNotEmpty } = require('../utils/validate');
const { findAll, findOne } = require('../services/user.service');
const { updatePassword } = require('../services/auth.service');

const userController = {
  // [GET] /api/users
  findAll: async (req, res, next) => {
    try {
      const users = await findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /api/users/:id
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      isObjectId(id, 'id');

      const user = await findOne(id);

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  // [POST] /api/users/:id
  resetPassword: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { newPassword } = req.body;

      isNotEmpty(id, 'id');
      isObjectId(id, 'id');

      isNotEmpty(newPassword, 'newPassword');
      isString(newPassword, 'newPassword');

      await updatePassword(id, newPassword);

      return res.status(200).json({ message: 'Reset password successfully!' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
