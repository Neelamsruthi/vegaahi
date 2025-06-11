import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Welcome to the Student Dashboard
      </h1>

      <div className="flex gap-4">
        <Link
          to="/student/profile"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Go to Profile
        </Link>

        <Link
          to="/student/allcourses"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          View All Courses
        </Link>
        <Link
          to="/student/enrollments"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
         enrolled Courses
        </Link>
        <Link
          to="/student/quizzes"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
       Take Quiz
        </Link>
        <Link
          to="/student/allusers"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
       view all users
        </Link>
        <Link
          to="/student/notifications"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
       view Notifications
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
  