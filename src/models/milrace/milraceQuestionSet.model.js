const mongoose = require('mongoose');

const MilraceQuestionSchema = new mongoose.Schema({
  index: Number,
  question: String,
  choices: Object, // { A: "...", B: "...", ... }
  ans: String,
});

const MilraceQuestionSetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    questions: [MilraceQuestionSchema],
  },
  {
    timestamps: true,
    collection: 'milrace_questionSet',
  },
);

module.exports = mongoose.model('MilraceQuestionSet', MilraceQuestionSetSchema);
