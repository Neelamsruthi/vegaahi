import React, { useState } from 'react';
import api from './api'; // Adjust path to your axios instance

export default function SendNotificationForm() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null); // success | error
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const payload = {
        message,
        // Optionally include `visibleTo: [userIds]` to target specific users
      };
      await api.post('/api/notifications', payload);
      setStatus('success');
      setMessage('');
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Send Notification</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter notification message..."
          rows={4}
          className="w-full p-3 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Notification'}
        </button>

        {status === 'success' && (
          <p className="text-green-600">Notification sent successfully.</p>
        )}
        {status === 'error' && (
          <p className="text-red-600">Failed to send notification.</p>
        )}
      </form>
    </div>
  );
}
