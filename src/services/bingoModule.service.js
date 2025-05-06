const { APIError } = require('../error');
const Module = require('../models/bingoModule.model');
const Question = require('../models/bingoQuestion.model');

const createModule = async (title, keywords) => {
  const existsModule = await Module.findOne({ title }).lean();
  if (existsModule) {
    throw new APIError('Bingo module already exists!', 409);
  }

  const module = new Module({
    title,
    keywords,
  });
  await module.save();

  return module;
};

const findAllModule = async () => {
  const modules = await Module.find().lean();
  if (modules.length === 0) {
    throw new APIError('Does not have any bingo module yet!', 200);
  }

  return modules;
};

const findModule = async (id) => {
  const module = await Module.findById(id).lean();
  if (!module) {
    throw new APIError('Bingo module not found!', 404);
  }

  return module;
};

const searchModule = async (query) => {
  if (!query || typeof query !== 'string') {
    throw new APIError('No bingo modules found!', 404);
  }

  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regexPattern = new RegExp(safeQuery, 'i');

  const modules = await Module.find({
    title: { $regex: regexPattern },
  }).lean();
  if (modules.length === 0) {
    throw new APIError('No bingo modules found!', 404);
  }

  return modules;
};

const updateModule = async (id, title, keywords) => {
  const module = await Module.findByIdAndUpdate(id, { title, keywords }, { new: true });
  if (!module) {
    throw new APIError('Bingo module not found!', 404);
  }

  return module;
};

const removeModule = async (id) => {
  const module = await Module.findById(id).lean();
  if (!module) {
    throw new APIError('Bingo module not found!', 404);
  }

  await Question.deleteMany({ moduleId: id });
  await Module.findByIdAndDelete(id);
};

module.exports = {
  createModule,
  findAllModule,
  findModule,
  searchModule,
  updateModule,
  removeModule,
};
