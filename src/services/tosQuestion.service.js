const { APIError } = require('../error');
const TOSQuestion = require('../models/tosQuestion.model');

const create = async (content, trustTitle, selfTitle) => {
  const question = new TOSQuestion({ content, trustTitle, selfTitle });
  await question.save();

  return question;
};

const findAll = async () => {
  const questions = await TOSQuestion.find().lean();
  if (questions.length === 0) {
    throw new APIError('No questions found!', 404);
  }

  return questions;
};

const findOne = async (id) => {
  const question = await TOSQuestion.findById(id).lean();
  if (!question) {
    throw new APIError('Question not found!', 404);
  }

  return question;
};

const update = async (id, content, trustTitle, selfTitle) => {
  const question = await TOSQuestion.findByIdAndUpdate(id, { content, trustTitle, selfTitle }, { new: true }).lean();
  if (!question) {
    throw new APIError('Question not found!', 404);
  }

  return question;
};

const remove = async (id) => {
  const question = await TOSQuestion.findByIdAndDelete(id);
  if (!question) {
    throw new APIError('Question not found!', 404);
  }
};

const countTrust = async (id) => {
  const question = await TOSQuestion.findByIdAndUpdate(id, { $inc: { trustCount: 1 } }, { new: true }).lean();
  if (!question) {
    throw new APIError('Question not found!', 404);
  }

  return question;
};

const countSelf = async (id) => {
  const question = await TOSQuestion.findByIdAndUpdate(id, { $inc: { selfCount: 1 } }, { new: true }).lean();
  if (!question) {
    throw new APIError('Question not found!', 404);
  }

  return question;
};

module.exports = { create, findAll, findOne, update, remove, countTrust, countSelf };
