const { APIError } = require('../error');
const User = require('../models/user.model');
const { hashPassword } = require('../utils/auth');

const findAll = async () => {
  const users = await User.find().lean();
  if (!users) {
    throw new APIError('Does not have any user yet!', 200);
  }

  return users;
};

const findOne = async (id) => {
  const user = await User.findById(id).lean();
  if (!user) {
    throw new APIError('User not found!', 404);
  }

  return user;
};

const updatePassword = async (id, newPassword) => {
  const user = await User.findById(id);
  if (!user) {
    throw new APIError('User not found!', 404);
  }

  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  await user.save();
};

module.exports = {
  findAll,
  findOne,
  updatePassword,
};
