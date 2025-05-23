const { createGameHistory, getAllGameHistories } = require('../../services/milrace/milraceQuestion.services');
const { isNotEmpty, isString } = require('../../utils/validate');

const milraceGameHistoryController = {
  // [POST] /milrace-game-history
  create: async (req, res, next) => {
    try {
      const { players, questionSetTitle } = req.body;

      isNotEmpty(questionSetTitle, 'questionSetTitle');
      isString(questionSetTitle, 'questionSetTitle');

      if (!Array.isArray(players) || players.length === 0) {
        throw new Error('players phải là một mảng hợp lệ');
      }

      // Gọi service đã cập nhật
      const result = await createGameHistory({ players, questionSetTitle });

      return res.status(201).json({
        success: true,
        message: 'Lưu lịch sử trò chơi thành công',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  // [GET] /milrace-game-history
  getAll: async (_req, res, next) => {
    try {
      const histories = await getAllGameHistories();
      return res.status(200).json({
        success: true,
        message: 'Lấy lịch sử trò chơi thành công',
        data: histories,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = milraceGameHistoryController;
