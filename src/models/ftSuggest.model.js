const mongoose = require('mongoose');

const ftSuggestSchema = new mongoose.Schema(
  {
    step: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    suggest: {
      type: String,
      required: true,
      trim: true,
    },
    emoji: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'future_teller_suggests',
  },
);

module.exports = mongoose.model('FTSuggest', ftSuggestSchema);
