const mongoose = require('mongoose');

const tosQuestionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    trustTitle: {
      type: String,
      required: true,
      trim: true,
    },
    trustCount: {
      type: Number,
      default: 0,
    },
    selfTitle: {
      type: String,
      required: true,
      trim: true,
    },
    selfCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: 'trust_or_self_questions',
  },
);

module.exports = mongoose.model('TOSQuestion', tosQuestionSchema);
