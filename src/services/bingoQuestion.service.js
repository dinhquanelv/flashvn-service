const { APIError } = require('../error');
const Module = require('../models/bingoModule.model');
const Question = require('../models/bingoQuestion.model');

const createQuestion = async (moduleId, keyword, title, correctAnswer, wrongAnswers) => {
  const module = await Module.findById(moduleId).lean();
  if (!module) {
    throw new APIError('Module not found!', 404);
  }

  if (!module.keywords.includes(keyword)) {
    throw new APIError('Keyword is not exist!', 400);
  }

  const question = new Question({
    moduleId,
    keyword,
    title,
    correctAnswer,
    wrongAnswers,
  });
  await question.save();

  return question;
};

const findAllQuestion = async (moduleId) => {
  const module = await Module.findById(moduleId).lean();
  if (!module) {
    throw new APIError('Module not found!', 404);
  }

  const questions = await Question.find({ moduleId }).lean();
  if (questions.length === 0) {
    throw new APIError('This module does not have any questions yet!', 200);
  }

  return questions;
};

const findOneQuestion = async (id) => {
  const question = await Question.findById(id).lean();
  if (!question) {
    throw new APIError('Question not found!', 404);
  }

  return question;
};

const searchQuestion = async (query) => {
  if (!query || typeof query !== 'string') {
    throw new APIError('No bingo questions found!', 404);
  }

  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regexPattern = new RegExp(safeQuery, 'i');

  const questions = await Question.find({
    title: { $regex: regexPattern },
  }).lean();
  if (questions.length === 0) {
    throw new APIError('No bingo questions found!', 200);
  }

  return questions;
};

const updateQuestion = async (id, keyword, title, correctAnswer, wrongAnswers) => {
  const question = await Question.findByIdAndUpdate(
    id,
    {
      keyword,
      title,
      correctAnswer,
      wrongAnswers,
    },
    { new: true },
  );
  if (!question) {
    throw new APIError('Question not found!', 404);
  }

  return question;
};

const removeQuestion = async (id) => {
  const question = await Question.findByIdAndDelete(id);
  if (!question) {
    throw new APIError('Question not found!', 404);
  }
};

module.exports = {
  createQuestion,
  findAllQuestion,
  findOneQuestion,
  searchQuestion,
  updateQuestion,
  removeQuestion,
};
