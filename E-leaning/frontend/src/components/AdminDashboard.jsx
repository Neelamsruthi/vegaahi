import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import api from "./api";

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
api.get("/api/quizzes") // Adjust this API endpoint if needed
      .then((response) => {
        setQuizzes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4 text-center">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mb-8 text-center text-lg">
          Welcome to the admin dashboard. Use the links below to manage admin
          features.
        </p>

        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <Link
            to="/admin/profile"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-200 shadow-md text-center"
          >
            Go to Profile
          </Link>

          <Link
            to="/admin/userlist"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-200 shadow-md text-center"
          >
            View User List
          </Link>

          <Link
            to="/admin/addcourse"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-200 shadow-md text-center"
          >
            Add Course
          </Link>

          <Link
            to="/admin/viewcourses"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-200 shadow-md text-center"
          >
            View Courses
          </Link>
          <Link
            to="/admin/sendnotification"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-200 shadow-md text-center"
          >
           Send Notification
          </Link>

          <Link
            to="/admin/createquiz"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-200 shadow-md text-center"
          >
            Create Quiz
          </Link>

          <h2 className="text-xl font-semibold mt-8 mb-2 text-center">
            Quiz Submissions:
          </h2>

          {loading && <p className="text-center text-gray-500">Loading quizzes...</p>}

          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && quizzes.length === 0 && (
            <p className="text-center text-gray-500">No quizzes available.</p>
          )}

          {!loading && !error && quizzes.length > 0 &&
            quizzes.map((quiz) => (
              <Link
                key={quiz._id}
                to={`/admin/quizzes/${quiz._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
              >
                {quiz.title} - Submissions ({quiz.submissionsCount || 0})
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
