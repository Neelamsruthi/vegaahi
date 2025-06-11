const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const QuizAnswer = require('../models/QuizAnswer');
const { authenticateToken } = require('../middleware/middleware');

// Admin: Create quiz
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create quizzes' });
    }

    const quiz = new Quiz({ ...req.body, creator: req.user.id });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created', quiz });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create quiz', error: err.message });
  }
});

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quizzes' });
  }
});

// Get single quiz
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get quiz' });
  }
});

// Admin: Update quiz
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    if (quiz.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this quiz' });
    }

    Object.assign(quiz, req.body);
    await quiz.save();
    res.json({ message: 'Quiz updated', quiz });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update quiz' });
  }
});

// Admin: Delete quiz
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    if (quiz.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this quiz' });
    }

    await quiz.remove();
    res.json({ message: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete quiz' });
  }
});

// User: Submit quiz answer
router.post('/:id/answer', authenticateToken, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const { answers } = req.body;
    let score = 0;

    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) {
        score++;
      }
    });

    const quizAnswer = new QuizAnswer({
      quiz: quiz._id,
      user: req.user.id,
      answers,
      score
    });

    await quizAnswer.save();
    res.status(201).json({ message: 'Answer submitted', score });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit answer', error: err.message });
  }
});

// Admin: View quiz submissions
router.get('/:id/answers', authenticateToken, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    if (quiz.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view answers' });
    }

    const answers = await QuizAnswer.find({ quiz: quiz._id }).populate('user', 'name email');
    res.json(answers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch answers', error: err.message });
  }
});

module.exports = router;
