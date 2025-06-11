import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './api';
import { FileText } from 'lucide-react';

export default function UserQuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await api.get('/api/quizzes');
      setQuizzes(res.data);
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-12 drop-shadow">
          📚 Explore Available Quizzes
        </h2>

        {quizzes.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No quizzes available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6 transition transform hover:scale-105 hover:shadow-2xl duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="text-indigo-600 w-6 h-6" />
                  <h3 className="text-xl font-semibold text-gray-800">{quiz.title}</h3>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  {quiz.description || 'No description provided.'}
                </p>

                <Link
                  to={`/student/quiz/${quiz._id}`}
                  className="inline-block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition duration-200"
                >
                  Take Quiz
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
