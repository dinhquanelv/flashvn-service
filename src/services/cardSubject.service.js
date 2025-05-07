const { APIError } = require('../error');
const Subject = require('../models/cardSubject.model');
const Question = require('../models/cardQuestion.model');

const create = async (title, group) => {
  const subjectInGroup = await Subject.findOne({ title, group });
  if (subjectInGroup) {
    throw new APIError('Subject title already exists in this group!', 400);
  }

  const subject = new Subject({
    title,
    group,
  });
  await subject.save();

  return subject;
};

const findAllByGroup = async (group) => {
  const subjects = await Subject.find({ group }).lean();
  if (subjects.length === 0) {
    throw new APIError('No subjects found!', 404);
  }

  return subjects;
};

const findOne = async (id) => {
  const subject = await Subject.findById(id).lean();
  if (!subject) {
    throw new APIError('Subject not found!', 404);
  }

  return subject;
};

const search = async (title, group) => {
  const safeQuery = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regexPattern = new RegExp(safeQuery, 'i');

  const subjects = await Subject.find({
    title: { $regex: regexPattern },
    group,
  }).lean();
  if (!subjects.length) {
    throw new APIError('No subjects found!', 200);
  }

  return subjects;
};

const update = async (id, title, group) => {
  const subjectInGroup = await Subject.findOne({ title, group });
  if (subjectInGroup) {
    throw new APIError('Subject title already exists in this group!', 400);
  }

  const subject = await Subject.findByIdAndUpdate(id, { title, group }, { new: true });
  if (!subject) {
    throw new APIError('Subject not found!', 404);
  }

  return subject;
};

const remove = async (id) => {
  const subject = await Subject.findById(id);
  if (!subject) {
    throw new APIError('Subject not found!', 404);
  }

  await Question.deleteMany({ subjectId: id });
  await Subject.findByIdAndDelete(id);
};

module.exports = { create, findAllByGroup, findOne, search, update, remove };
