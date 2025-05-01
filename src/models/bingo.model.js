const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const bingoSchema = new mongoose.Schema(
  {
    moduleId: {
      type: ObjectId,
      ref: 'BingoModule',
      required: true,
    },
    index: {
      type: Number,
      required: true,
      max: 60,
    },
    keywords: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Bingo', bingoSchema);
