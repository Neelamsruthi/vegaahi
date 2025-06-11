import React, { useEffect, useState } from 'react';
import api from './api';

const Allcourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [playingCourseId, setPlayingCourseId] = useState(null);
  const [enrollingId, setEnrollingId] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchEnrolledCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get('api/courses', { withCredentials: true });
      setCourses(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load courses.');
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const res = await api.get('api/enrollments', { withCredentials: true });
      setEnrolledCourses(res.data.enrolledCourseIds || []);
    } catch (err) {
      console.error('Fetch enrolled courses error:', err);
    }
  };

  const toggleVideo = (courseId) => {
    setPlayingCourseId((prev) => (prev === courseId ? null : courseId));
  };

 const handleEnroll = async (courseId) => {
  try {
    const response = await api.post('api/enroll', { courseId }, { withCredentials: true });
    alert(response.data.message);
  } catch (err) {
    console.error('Enroll error:', err.response?.data || err.message);
    alert(err.response?.data?.message || 'Failed to enroll in this course.');
  }
};


  if (loading)
    return <div className="text-center py-8 text-lg font-semibold animate-pulse">Loading courses...</div>;

  if (error)
    return <div className="text-red-500 p-4 text-center font-medium">{error}</div>;

  if (!courses.length)
    return <div className="text-gray-600 p-4 text-center">No courses found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">All Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const firstVideo = course.content.find((item) => item.type === 'video');
          const isPlaying = playingCourseId === course._id;
          const isEnrolled = enrolledCourses.includes(course._id);
          const isEnrolling = enrollingId === course._id;

          return (
            <div key={course._id} className="bg-white shadow-xl rounded-2xl p-4 hover:shadow-2xl transition-all flex flex-col">
              {isPlaying && firstVideo ? (
                <video
                  src={`http://localhost:5000/uploads/videos/${firstVideo.filename}`}
                  controls
                  autoPlay
                  onEnded={() => setPlayingCourseId(null)}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              ) : course.thumbnail ? (
                <img
                  src={`http://localhost:5000/uploads/thumbnails/${course.thumbnail}`}
                  alt={`${course.title} thumbnail`}
                  className="w-full h-48 object-cover rounded-xl mb-4 cursor-pointer hover:opacity-90 transition"
                  onClick={() => toggleVideo(course._id)}
                />
              ) : (
                <div
                  className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 cursor-pointer mb-4"
                  onClick={() => toggleVideo(course._id)}
                >
                  No Thumbnail (Click to Play)
                </div>
              )}

              <h2 className="text-xl font-semibold mb-2 text-gray-800 truncate">{course.title}</h2>
              <p className="text-gray-600 mb-2 line-clamp-2">{course.summary || 'No summary available.'}</p>
              <p className="text-sm text-gray-500">By: {course.createdBy?.name || 'Admin'}</p>
              {firstVideo && (
                <p className="text-xs text-blue-600 mt-2">Includes video content</p>
              )}

              <button
                onClick={() => handleEnroll(course._id)}
                disabled={isEnrolled || isEnrolling}
                className={`mt-4 px-4 py-2 rounded-md text-white font-semibold transition
                  ${isEnrolled ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
                  ${isEnrolling ? 'opacity-70 cursor-wait' : ''}
                `}
              >
                {isEnrolling ? 'Enrolling...' : isEnrolled ? 'Enrolled' : 'Enroll'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Allcourses;
