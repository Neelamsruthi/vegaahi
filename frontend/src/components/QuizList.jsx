import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './api';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await api.get('/api/quizzes');
        setQuizzes(res.data);
      } catch (err) {
        alert('Failed to fetch quizzes');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading quizzes...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📚 Available Quizzes</h1>
      <ul className="space-y-4">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{quiz.title}</h2>
            <p className="text-gray-700">{quiz.description}</p>
            <Link
              to={`/quizzes/${quiz._id}/take`}
              className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Take Quiz
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
