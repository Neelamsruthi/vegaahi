import React, { useState } from "react";
import api from "./api";

export default function AddCourse({ token }) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !thumbnail || videos.length === 0) {
      setMessage("Please fill all required fields and upload files.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("thumbnail", thumbnail);
    for (let i = 0; i < videos.length; i++) {
      formData.append("videos", videos[i]);
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post(
        "/api/courses",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,  // token passed via props
          },
        }
      );

      setMessage("Course created successfully!");
      setTitle("");
      setSummary("");
      setThumbnail(null);
      setVideos([]);
      e.target.reset();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to create course"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Course</h2>
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.includes("successfully")
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div>
          <label className="block mb-1 font-medium">Title *</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Summary</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            rows="4"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Thumbnail Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            required
            className="block"
          />
          {thumbnail && (
            <p className="mt-1 text-sm text-gray-600">{thumbnail.name}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Course Videos * (multiple allowed)
          </label>
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={(e) => setVideos(e.target.files)}
            required
            className="block"
          />
          {videos.length > 0 && (
            <ul className="mt-1 text-sm text-gray-600 list-disc list-inside max-h-24 overflow-y-auto">
              {Array.from(videos).map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Uploading..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}
