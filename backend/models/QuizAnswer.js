// models/QuizAnswer.js
const mongoose = require('mongoose');

const quizAnswerSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: [Number], // index of selected answers
  score: Number,
}, { timestamps: true });

module.exports = mongoose.model('QuizAnswer', quizAnswerSchema);
