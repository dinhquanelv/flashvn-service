const { isObjectId, isNotEmpty, isString } = require('../utils/validate');
const { generateBingoCards, findOneBingo } = require('../services/bingo.service');
const { generatePDFFile } = require('../utils/generatePDFFile');

const bingoController = {
  // [POST] /bingo/generate/:moduleId
  generate: async (req, res, next) => {
    try {
      const { moduleId } = req.params;
      isNotEmpty(moduleId, 'moduleId');
      isObjectId(moduleId, 'moduleId');

      const bingoCards = await generateBingoCards(moduleId, 60);

      return res.status(201).json(bingoCards);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /bingo/:moduleId/:index
  findOne: async (req, res, next) => {
    try {
      const { moduleId, index } = req.params;

      isNotEmpty(moduleId, 'moduleId');
      isObjectId(moduleId, 'moduleId');

      isNotEmpty(index, 'index');
      isString(index, 'index');

      const bingo = await findOneBingo(moduleId, index);

      return res.status(200).json(bingo);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /bingo/download/pdf/:moduleId
  downloadPDF: async (req, res, next) => {
    try {
      const { moduleId } = req.params;
      isNotEmpty(moduleId, 'moduleId');
      isObjectId(moduleId, 'moduleId');

      const pdfBuffer = await generatePDFFile(moduleId);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="MIL_BINGO_Player_card.pdf"',
      });

      res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = bingoController;
