const mongoose = require('mongoose');

const bingoModuleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 32,
    },
    keywords: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'bingo_modules',
  },
);

module.exports = mongoose.model('BingoModule', bingoModuleSchema);
