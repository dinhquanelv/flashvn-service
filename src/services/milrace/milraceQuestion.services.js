const { APIError } = require('../error');
const GameHistory = require('../models/milraceGameHistory.model'); // Đường dẫn model cần đúng với project bạn

// Tạo lịch sử người chơi mới
const createGameHistory = async (payload) => {
  try {
    const { questionSetTitle, player1, player2, player3, player4, player5 } = payload;

    if (!questionSetTitle || !player1 || !player2 || !player3 || !player4 || !player5) {
      throw new APIError('All player fields and questionSetTitle are required!', 400);
    }

    const newGame = new GameHistory({ questionSetTitle, player1, player2, player3, player4, player5 });
    await newGame.save();
    return newGame;
  } catch (error) {
    throw new APIError(error.message || 'Failed to create game history', 500);
  }
};

// Lấy danh sách lịch sử người chơi
const getAllGameHistories = async () => {
  const histories = await GameHistory.find().sort({ createdAt: -1 }).lean();
  if (!histories.length) {
    throw new APIError('No game history found!', 404);
  }
  return histories;
};

module.exports = {
  createGameHistory,
  getAllGameHistories,
};
