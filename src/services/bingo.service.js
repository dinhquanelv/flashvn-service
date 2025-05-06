const { APIError } = require('../error');
const Bingo = require('../models/bingo.model');
const Module = require('../models/bingoModule.model');
const { getRandomKeywords } = require('../utils/bingo');

const generateBingoCards = async (moduleId, numberOfCards) => {
  try {
    const module = await Module.findById(moduleId).lean();
    if (!module) {
      throw new APIError('Module not found!', 404);
    }

    if (module.keywords.length !== 30) {
      throw new APIError('Module must have 30 keywords!', 400);
    }

    await Bingo.deleteMany({ moduleId });

    // generate bingo card
    const bingoCards = [];
    for (let i = 0; i < numberOfCards; i++) {
      const keywords = getRandomKeywords(module.keywords, 16);
      bingoCards.push({
        moduleId,
        index: i + 1,
        title: module.title,
        keywords,
      });
    }

    const savedCards = await Bingo.insertMany(bingoCards);
    return savedCards;
  } catch (error) {
    throw new APIError(error, 500);
  }
};

const findOneBingo = async (moduleId, index) => {
  const indexNum = parseInt(index, 10);

  if (isNaN(indexNum) || indexNum < 1 || indexNum > 60) {
    throw new APIError('Index must be a number between 1 and 60!', 400);
  }

  const bingo = await Bingo.findOne({ moduleId, index }).populate('moduleId', 'title');
  if (!bingo) {
    throw new APIError('Bingo not found!', 404);
  }

  return bingo;
};

const findAllBingo = async (moduleId) => {
  const bingos = await Bingo.find({ moduleId }).populate('moduleId', 'title');
  if (bingos.length === 0) {
    throw new APIError('No bingo card found!', 404);
  }

  return bingos;
};

module.exports = {
  generateBingoCards,
  findOneBingo,
  findAllBingo,
};
