const { APIError } = require('../error');
const Question = require('../models/cardQuestion.model');

const create = async (subjectId, title, correctAnswer, wrongAnswers) => {
  const question = new Question({
    subjectId,
    title,
    correctAnswer,
    wrongAnswers,
  });
  await question.save();

  return question;
};

const findAll = async (subjectId) => {
  const questions = await Question.find({ subjectId }).lean();
  if (questions.length === 0) {
    throw new APIError('No questions found!', 404);
  }

  return questions;
};

const findOne = async (id) => {
  const question = await Question.findById(id).lean();
  if (!question) {
    throw new APIError('Question not found!', 404);
  }

  return question;
};

const search = async (subjectId, query) => {
  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regexPattern = new RegExp(safeQuery, 'i');

  const questions = await Question.find({
    subjectId,
    title: { $regex: regexPattern },
  }).lean();

  if (questions.length === 0) {
    throw new APIError('No questions found!', 200);
  }

  return questions;
};

const update = async (id, title, correctAnswer, wrongAnswers) => {
  const question = await Question.findByIdAndUpdate(
    id,
    {
      title,
      correctAnswer,
      wrongAnswers,
    },
    {
      new: true,
    },
  );
  if (!question) {
    throw new APIError('Question not found!', 404);
  }

  return question;
};

const remove = async (id) => {
  const question = await Question.findByIdAndDelete(id);
  if (!question) {
    throw new APIError('Question not found!', 404);
  }
};

module.exports = { create, findAll, findOne, search, update, remove };
