import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api';

const AdminCoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [playingCourseId, setPlayingCourseId] = useState(null);

  // Editing state
  const [editCourseId, setEditCourseId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSummary, setEditSummary] = useState('');
  const [editThumbnail, setEditThumbnail] = useState(null);
  const [editVideo, setEditVideo] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get('api/admin/courses', { withCredentials: true });
      setCourses(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load courses.');
    } finally {
      setLoading(false);
    }
  };

  const toggleVideo = (courseId) => {
    setPlayingCourseId((prev) => (prev === courseId ? null : courseId));
  };

  const deleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await api.delete(`api/admin/courses/${id}`, { withCredentials: true });
      setCourses(courses.filter((course) => course._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete course.');
    }
  };

  const startEditing = (course) => {
    setEditCourseId(course._id);
    setEditTitle(course.title);
    setEditSummary(course.summary || '');
    setEditThumbnail(null);
    setEditVideo(null);
  };

  const cancelEdit = () => {
    setEditCourseId(null);
    setEditTitle('');
    setEditSummary('');
    setEditThumbnail(null);
    setEditVideo(null);
  };

  const saveEdit = async () => {
    const formData = new FormData();
    formData.append('title', editTitle);
    formData.append('summary', editSummary);
    if (editThumbnail) formData.append('thumbnail', editThumbnail);
    if (editVideo) formData.append('videos', editVideo);

    try {
      const res = await api.put(
        `/api/courses/${editCourseId}`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      const updatedCourse = res.data.course;
      setCourses((prev) =>
        prev.map((c) => (c._id === editCourseId ? updatedCourse : c))
      );
      cancelEdit();
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update course.');
    }
  };

  if (loading) return <div className="text-center py-8 text-lg font-semibold animate-pulse">Loading courses...</div>;
  if (error) return <div className="text-red-500 p-4 text-center font-medium">{error}</div>;
  if (!courses.length) return <div className="text-gray-600 p-4 text-center">No courses found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">All Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const firstVideo = course.content.find((item) => item.type === 'video');
          const isPlaying = playingCourseId === course._id;

          return (
            <div key={course._id} className="bg-white shadow-xl rounded-2xl p-4 relative hover:shadow-2xl transition-all">
              {isPlaying && firstVideo ? (
                <video
                  src={`http://localhost:5000/uploads/videos/${firstVideo.filename}`}
                  controls
                  onEnded={() => setPlayingCourseId(null)}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              ) : (
                course.thumbnail && (
                  <img
                    src={`http://localhost:5000/uploads/thumbnails/${course.thumbnail}`}
                    alt={`${course.title} thumbnail`}
                    className="w-full h-48 object-cover rounded-xl mb-4 cursor-pointer hover:opacity-90 transition"
                    onClick={() => toggleVideo(course._id)}
                  />
                )
              )}

              <h2 className="text-xl font-semibold mb-2 text-gray-800 truncate">{course.title}</h2>
              <p className="text-gray-600 mb-2 line-clamp-2">{course.summary || 'No summary available.'}</p>
              <p className="text-sm text-gray-500 mb-4">By: {course.createdBy?.name || 'Admin'}</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => startEditing(course)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-lg shadow"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCourse(course._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg shadow"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editCourseId && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={cancelEdit}
          />
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div
              className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Course</h3>
              <input
                type="text"
                className="w-full border border-gray-300 p-3 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Course Title"
              />
              <textarea
                className="w-full border border-gray-300 p-3 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editSummary}
                onChange={(e) => setEditSummary(e.target.value)}
                placeholder="Course Summary"
                rows={4}
              />
              <label className="block mb-4">
                <span className="text-sm text-gray-700 font-medium">Change Thumbnail</span>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full mt-2"
                  onChange={(e) => setEditThumbnail(e.target.files[0])}
                />
              </label>
              <label className="block mb-6">
                <span className="text-sm text-gray-700 font-medium">Change Video</span>
                <input
                  type="file"
                  accept="video/*"
                  className="block w-full mt-2"
                  onChange={(e) => setEditVideo(e.target.files[0])}
                />
              </label>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={saveEdit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-xl font-semibold shadow"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminCoursesList;
