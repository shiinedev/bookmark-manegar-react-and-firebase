// src/pages/Contact.js
import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  //contact 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send an email or store in a database)
    
  };

  return (
    <div className='sm:w-100 md:w-3/4 md:mx-auto lg:w-1/2 lg:mx-auto  shadow-lg p-8 bg-white m-2'>
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          <label className="block text-gray-700">Message:</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
};

export default Contact;
