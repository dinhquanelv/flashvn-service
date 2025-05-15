const mongoose = require('mongoose');

const ftCardSchema = new mongoose.Schema(
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
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'future_teller_cards',
  },
);

module.exports = mongoose.model('FTCard', ftCardSchema);
