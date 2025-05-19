const mongoose = require('mongoose');

const MilraceGameHistorySchema = new mongoose.Schema(
  {
    questionSetTitle: { type: String, required: true },
    player1: { type: String, required: true },
    player2: { type: String, required: true },
    player3: { type: String, required: true },
    player4: { type: String, required: true },
    player5: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'milrace_gameHistory',
  },
);

module.exports =  mongoose.model('MilraceGameHistory', MilraceGameHistorySchema);
