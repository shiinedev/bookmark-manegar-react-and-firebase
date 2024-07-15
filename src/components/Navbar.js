// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/signin');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">Bookmark Manager</div>
        <div className="space-x-4 flex">
 
          {user && <Link to="/bookmarks" className="text-gray-300 hover:text-white">Home</Link>}
         
          <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
          {!user && <Link to="/signin" className="text-gray-300 hover:text-white">Sign In</Link>}
          {!user && <Link to="/signup" className="text-gray-300 hover:text-white">Sign Up</Link>}
          {user && <button onClick={handleLogout} className="text-gray-300 hover:text-white">Logout</button>}
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
