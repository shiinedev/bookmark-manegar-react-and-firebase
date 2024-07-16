// src/pages/About.js
import React from 'react';

const About = () => {
  return (
    <div className='sm:w-100 md:w-3/4 md:mx-auto lg:w-4/5 lg:mx-auto '>
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
        <p className="text-gray-700">Our mission is to provide the best bookmark management service to help you organize your online resources efficiently.</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
        <p className="text-gray-700">Our vision is to become the leading platform for bookmark management and digital organization.</p>
      </div>
    </div>
  );
};

export default About;
