import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react'; // Optional: Icons
import api from './api';

export default function QuizAttempt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await api.get(`/api/quizzes/${id}`);
      setQuiz(res.data);
      setAnswers(new Array(res.data.questions.length).fill(null));
    };
    fetchQuiz();
  }, [id]);

  const handleChange = (questionIndex, selectedOption) => {
    if (submitted) return;
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedOption;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post(`/api/quizzes/${id}/answer`, { answers });
      setScore(res.data.score);
      setSubmitted(true);
    } catch (err) {
      alert('Failed to submit quiz');
    }
  };

  if (!quiz) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">{quiz.title}</h2>

      {quiz.questions.map((q, idx) => {
        const userAnswer = answers[idx];
        const correctAnswer = q.correctAnswer;

        return (
          <div key={idx} className="mb-8 p-6 rounded-xl shadow-md border border-gray-200 bg-white">
            <p className="text-lg font-medium mb-4">{idx + 1}. {q.questionText}</p>

            <div className="grid gap-3">
              {q.options.map((opt, optIdx) => {
                const isSelected = userAnswer === optIdx;
                const isCorrect = correctAnswer === optIdx;
                const isWrongSelection = isSelected && optIdx !== correctAnswer;

                let base = "p-3 rounded-lg cursor-pointer transition duration-200 border ";
                let style = "bg-gray-100 border-gray-300 hover:bg-gray-200";

                if (submitted) {
                  if (isCorrect) style = "bg-green-100 border-green-400 text-green-800";
                  else if (isWrongSelection) style = "bg-red-100 border-red-400 text-red-800";
                  else style = "bg-gray-50 text-gray-600";
                } else if (isSelected) {
                  style = "bg-indigo-100 border-indigo-400 text-indigo-800";
                }

                return (
                  <label key={optIdx} className={`${base} ${style}`} onClick={() => handleChange(idx, optIdx)}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`question-${idx}`}
                        value={optIdx}
                        checked={isSelected}
                        onChange={() => handleChange(idx, optIdx)}
                        className="hidden"
                        disabled={submitted}
                      />
                      <span>{opt}</span>
                      {submitted && isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                      {submitted && isWrongSelection && <XCircle className="w-5 h-5 text-red-600" />}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}

      {!submitted ? (
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-md transition duration-200"
          >
            Submit Answers
          </button>
        </div>
      ) : (
        <div className="text-center mt-8">
          <p className="text-2xl font-semibold text-green-700 mb-2">
            ✅ Correct: {score} / {quiz.questions.length}
          </p>
          <p className="text-2xl font-semibold text-red-600">
            ❌ Wrong: {quiz.questions.length - score}
          </p>
          <button
            onClick={() => navigate('/student/quizzes')}
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
          >
            Back to Quiz List
          </button>
        </div>
      )}
    </div>
  );
}
