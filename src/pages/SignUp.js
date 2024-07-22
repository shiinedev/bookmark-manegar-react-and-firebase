// src/pages/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //sing up function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //user regestration
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!");
      navigate('/');
    } catch (err) {
      setError(err.toast);
      toast.error("already regestred");
    }
  };

  return (
    <div className='sm:w-100 md:w-3/4 md:mx-auto lg:w-1/2 lg:mx-auto  shadow-lg p-8 bg-white mt-16'>
      <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
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
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
