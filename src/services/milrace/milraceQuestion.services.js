const { APIError } = require('../../error');
const MilraceGameHistory = require('../../models/milrace/milraceGameHistory.model'); // Đường dẫn model cần đúng với project bạn

// Tạo lịch sử người chơi mới
const createGameHistory = async (payload) => {
  try {
    const { players, questionSetTitle } = payload;
    if (!Array.isArray(players) || !questionSetTitle) {
      throw new APIError('Dữ liệu không hợp lệ', 400);
    }

    const sorted = players.sort((a, b) => a.index - b.index);
    const maxPlayers = 5;
    const winningPosition = 32;

    const history = {
      questionSetTitle,
    };

    for (let i = 0; i < maxPlayers; i++) {
      const player = sorted[i];

      if (!player) {
        history[`player${i + 1}`] = 'Không có';
        continue;
      }

      const { name, answered, correctAnswers, position } = player;
      const isWinner = position >= winningPosition;

      let correctRateText = 'N/A';
      if (answered > 0) {
        const rate = Math.round((correctAnswers / answered) * 100);
        correctRateText = `${rate}%`;
      }

      history[`player${i + 1}`] = isWinner
        ? `${name}, chiến thắng, ${correctRateText}`
        : `${name}, đúng ${correctRateText}`;
    }

    const newGame = new MilraceGameHistory(history);
    await newGame.save();
    return newGame;
  } catch (error) {
    throw new APIError(error.message || 'Failed to create game history', 500);
  }
};

// Lấy danh sách lịch sử người chơi
const getAllGameHistories = async () => {
  const histories = await MilraceGameHistory.find().sort({ createdAt: -1 }).lean();
  if (!histories.length) {
    throw new APIError('No game history found!', 404);
  }
  return histories;
};

module.exports = {
  createGameHistory,
  getAllGameHistories,
};
