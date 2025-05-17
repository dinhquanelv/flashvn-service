import mongoose from 'mongoose';

const MilraceQuestionSchema = new mongoose.Schema({
  index: Number,
  question: String,
  choices: Object, // { A: "...", B: "...", ... }
  ans: String,
});

const MilraceQuestionSetSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  questions: [MilraceQuestionSchema],
});

export const MilraceQuestionSet =
  mongoose.models.MilraceQuestionSet || mongoose.model('MilraceQuestionSet', MilraceQuestionSetSchema);
