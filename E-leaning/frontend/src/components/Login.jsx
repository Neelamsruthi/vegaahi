import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });
      if (result && result.success) {
        setMessage('Login successful!');
    
      } else {
        setMessage('Invalid email or password');
      }
    } catch (err) {
      setMessage('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-indigo-200">
      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md border border-indigo-300"
      >
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">Login</h2>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {message && (
          <div
            className={`mb-4 text-center text-sm ${
              message === 'Login successful!' ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Login
        </button>
        <div className="text-center mt-4 text-sm text-gray-600">
  Don&apos;t have an account?{' '}
  <span className="text-indigo-600 hover:underline cursor-pointer">
    <Link to="/register">Register here</Link>
  </span>
</div>

      </form>
    </div>
  );
};

export default Login;
