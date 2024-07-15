// src/pages/SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed in successfully!");
      navigate('/');
    } catch (err) {
      setError(err.message);
      toast.error('first sign up');
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Sign In</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
