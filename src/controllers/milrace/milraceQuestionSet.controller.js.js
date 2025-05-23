const { createQuestionSet } = require('../../services/milrace/milraceQuestionSet.service');
const { getAllSets, getSetById, updateSet, deleteSet } = require('../../services/milrace/milraceQuestionSet.service');
const { isNotEmpty, isObjectId, isString } = require('../../utils/validate');

const milraceQuestionSetController = {
  // [POST] /milrace-question-set
  create: async (req, res, next) => {
    try {
      const { title, questions } = req.body;

      isNotEmpty(title, 'title');
      isString(title, 'title');

      const result = await createQuestionSet({ title, questions });
      return res.status(201).json({
        success: true,
        message: 'Tạo bộ câu hỏi thành công',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  // [GET] /milrace-question-set
  getAll: async (_req, res, next) => {
    try {
      const sets = await getAllSets();
      return res.status(200).json({
        success: true,
        message: 'Lấy danh sách bộ câu hỏi thành công',
        data: sets,
      });
    } catch (error) {
      next(error);
    }
  },

  // [GET] /milrace-question-set/:id
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      isNotEmpty(id, 'id');
      isObjectId(id, 'id');

      const set = await getSetById(id);
      return res.status(200).json({
        success: true,
        message: 'Lấy thông tin bộ câu hỏi thành công',
        data: set,
      });
    } catch (error) {
      next(error);
    }
  },

  // [PUT] /milrace-question-set/:id
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, questions } = req.body;

      isNotEmpty(id, 'id');
      isObjectId(id, 'id');
      console.log(id, title, questions);
      const updated = await updateSet(id, { title, questions });
      return res.status(200).json({
        success: true,
        message: 'Cập nhật bộ câu hỏi thành công',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  },

  // [DELETE] /milrace-question-set/:id
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      isNotEmpty(id, 'id');
      isObjectId(id, 'id');

      const deleted = await deleteSet(id);
      return res.status(200).json({
        success: true,
        message: 'Xóa bộ câu hỏi thành công',
        data: deleted,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = milraceQuestionSetController;
