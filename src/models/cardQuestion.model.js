const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const cardQuestionSchema = new mongoose.Schema(
  {
    subjectId: {
      type: ObjectId,
      ref: 'CardSubject',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },
    wrongAnswers: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('CardQuestion', cardQuestionSchema);
