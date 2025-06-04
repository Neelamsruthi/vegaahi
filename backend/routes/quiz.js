const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const QuizAnswer = require('../models/QuizAnswer');
const { authenticateToken } = require('../middleware/middleware');

// ---------- PUBLIC: Get all quizzes for students (no auth required) ----------
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quizzes', error: err.message });
  }
});

// ---------- ADMIN ROUTES (require admin role) ----------

// Get all quizzes with submissions count for admin dashboard
router.get('/admin', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

  try {
    const quizzes = await Quiz.find();

    const quizzesWithCounts = await Promise.all(
      quizzes.map(async (quiz) => {
        const count = await QuizAnswer.countDocuments({ quiz: quiz._id });
        return { ...quiz.toObject(), submissionsCount: count };
      })
    );

    res.json(quizzesWithCounts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quizzes', error: err.message });
  }
});

// Create new quiz
router.post('/', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

  try {
    const quiz = new Quiz({ ...req.body, creator: req.user.id });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created', quiz });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create quiz', error: err.message });
  }
});

// Update quiz (title/questions)
router.put('/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const { title, questions } = req.body;

    if (title !== undefined) quiz.title = title;

    if (questions !== undefined) {
      if (!Array.isArray(questions)) {
        return res.status(400).json({ message: 'Questions must be an array' });
      }

      for (const q of questions) {
        if (
          typeof q.questionText !== 'string' ||
          !Array.isArray(q.options) ||
          typeof q.correctAnswer !== 'number' ||
          q.correctAnswer < 0 ||
          q.correctAnswer >= q.options.length
        ) {
          return res.status(400).json({ message: 'Invalid question format' });
        }
      }

      quiz.questions = questions;
    }

    await quiz.save();
    res.json({ message: 'Quiz updated', quiz });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update quiz', error: err.message });
  }
});

// Delete quiz (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') 
    return res.status(403).json({ message: 'Forbidden' });

  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) 
      return res.status(404).json({ message: 'Quiz not found' });

   await Quiz.findByIdAndDelete(req.params.id);

    res.json({ message: 'Quiz deleted' });
  } catch (err) {
    console.error("Error deleting quiz:", err);
    res.status(500).json({ message: 'Failed to delete quiz', error: err.message });
  }
});

// ---------- NEW: ADD / DELETE INDIVIDUAL QUESTIONS ----------

// Add a new question to quiz
router.post('/:id/questions', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

  const { questionText, options, correctAnswer } = req.body;
  if (
    typeof questionText !== 'string' ||
    !Array.isArray(options) ||
    typeof correctAnswer !== 'number' ||
    correctAnswer < 0 ||
    correctAnswer >= options.length
  ) {
    return res.status(400).json({ message: 'Invalid question format' });
  }

  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    quiz.questions.push({ questionText, options, correctAnswer });
    await quiz.save();
    res.json({ message: 'Question added', quiz });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add question', error: err.message });
  }
});

// Delete a question from quiz by index
router.delete('/:id/questions/:index', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

  const index = parseInt(req.params.index);
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    if (index < 0 || index >= quiz.questions.length) {
      return res.status(400).json({ message: 'Invalid question index' });
    }

    quiz.questions.splice(index, 1);
    await quiz.save();
    res.json({ message: 'Question deleted', quiz });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete question', error: err.message });
  }
});

// ---------- STUDENT ROUTES ----------

// Get single quiz (for taking quiz)
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get quiz', error: err.message });
  }
});

// Submit quiz answer (authenticated)
router.post('/:id/answer', authenticateToken, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const { answers } = req.body;
    let score = 0;

    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) score++;
    });

    const quizAnswer = new QuizAnswer({
      quiz: quiz._id,
      user: req.user.id,
      answers,
      score,
    });

    await quizAnswer.save();
    res.status(201).json({ message: 'Answer submitted', score });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit answer', error: err.message });
  }
});

// Get all answers/submissions for a quiz (authenticated)
router.get('/:id/answers', authenticateToken, async (req, res) => {
  try {
    const quizId = req.params.id;

    const submissions = await QuizAnswer.find({ quiz: quizId })
      .populate('user', 'name email')
      .exec();

    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quiz submissions', error: err.message });
  }
});

module.exports = router;
