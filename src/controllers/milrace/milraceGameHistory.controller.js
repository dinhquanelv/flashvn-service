const { createGameHistory, getAllGameHistories } = require('../services/milraceGameHistory.service');
const { isNotEmpty, isString } = require('../utils/validate');

const milraceGameHistoryController = {
  // [POST] /milrace-game-history
  create: async (req, res, next) => {
    try {
      const { questionSetTitle, player1, player2, player3, player4, player5 } = req.body;

      [questionSetTitle, player1, player2, player3, player4, player5].forEach((value, idx) => {
        isNotEmpty(value, `player${idx === 0 ? 'Title' : idx}`);
        isString(value, `player${idx === 0 ? 'Title' : idx}`);
      });

      const result = await createGameHistory({
        questionSetTitle,
        player1,
        player2,
        player3,
        player4,
        player5,
      });

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /milrace-game-history
  getAll: async (_req, res, next) => {
    try {
      const histories = await getAllGameHistories();
      return res.status(200).json(histories);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = milraceGameHistoryController;
