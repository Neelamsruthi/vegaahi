import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './api';

const MyEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await api.get('/api/enrollments', { withCredentials: true });
      setEnrollments(res.data.enrollments || []);
    } catch (err) {
      console.error('Error fetching enrollments:', err);
      setError('Failed to load enrollments.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-8 text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-red-600 text-center p-4">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Enrollments</h1>

      {enrollments.length === 0 ? (
        <div className="text-center text-gray-600">You are not enrolled in any courses.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {enrollments.map((enroll) => (
            <Link
              key={enroll._id}
              to={`/enrollments/${enroll._id}`}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition border"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-1">{enroll.course.title}</h2>
              <p className="text-gray-600 text-sm">{enroll.course.summary}</p>
              <p className="text-sm text-gray-500 mt-2">Progress: {enroll.progress}%</p>
              <p className="text-sm text-gray-500 capitalize">Status: {enroll.status}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrollments;
