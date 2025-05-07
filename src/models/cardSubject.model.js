const mongoose = require('mongoose');

const cardSubjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    group: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'card_subjects',
  },
);

module.exports = mongoose.model('CardSubject', cardSubjectSchema);
