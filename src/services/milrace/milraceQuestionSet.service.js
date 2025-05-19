const { APIError } = require('../../error');
const MilraceQuestionSet = require('../../models/milrace/milraceQuestionSet.model');

// Thêm mới bộ câu hỏi
const createQuestionSet = async ({ title, questions }) => {
  if (!title || typeof title !== 'string') {
    throw new APIError('Title is required and must be a string!', 400);
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new APIError('Questions must be a non-empty array!', 400);
  }

  try {
    const newSet = new MilraceQuestionSet({ title, questions });
    await newSet.save();
    return newSet;
  } catch (error) {
    if (error.code === 11000) {
      throw new APIError('Title must be unique!', 400);
    }
    throw new APIError(error.message || 'Failed to create question set', 500);
  }
};

// Lấy danh sách tất cả bộ câu hỏi
const getAllSets = async () => {
  const sets = await MilraceQuestionSet.find().lean();
  if (!sets.length) throw new APIError('No question sets found!', 404);
  return sets;
};

// Lấy chi tiết 1 bộ câu hỏi và toàn bộ câu hỏi
const getSetById = async (id) => {
  const set = await MilraceQuestionSet.findById(id).lean();
  if (!set) throw new APIError('Question set not found!', 404);
  return set;
};

// Cập nhật thông tin bộ câu hỏi (title) và/hoặc danh sách câu hỏi
const updateSet = async (id, payload) => {
  const existingSet = await MilraceQuestionSet.findById(id);
  if (!existingSet) throw new APIError('Question set not found!', 404);

  if (payload.title) existingSet.title = payload.title;
  if (Array.isArray(payload.questions)) {
    existingSet.questions = payload.questions;
  }

  await existingSet.save();
  return existingSet;
};

// Xoá bộ câu hỏi
const deleteSet = async (id) => {
  const deleted = await MilraceQuestionSet.findByIdAndDelete(id);
  if (!deleted) throw new APIError('Question set not found!', 404);
  return deleted;
};

module.exports = {
  getAllSets,
  getSetById,
  updateSet,
  deleteSet,
  createQuestionSet, // 💡 đừng quên export
};
