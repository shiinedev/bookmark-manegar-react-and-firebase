// src/components/Navbar.js
import React,{useState}from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import menu icons

const Navbar = ({ user }) => {
 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  //handle logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/signin');
  };
  //side bar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container sm:w-100 md:w-3/4 md:mx-auto lg:w-4/5 lg:mx-auto  mx-auto flex justify-between items-center ">
          <div className="text-white font-bold">Bookmark Manager</div>
          <div className="md:hidden text-white text-2xl cursor-pointer" onClick={toggleSidebar}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
          {user && <Link to="/" className="text-black bg-gray-400  py-1 px-3  rounded ">Home</Link>}
            <Link to="/about" className="text-gray-300 hover:text-black hover:bg-gray-400 px-2 py-1 rounded">About</Link>
            <Link to="/contact" className="text-gray-300  hover:text-black hover:bg-gray-400 px-2 py-1 rounded">Contact</Link>
            {!user && <Link to="/signin" className="text-gray-300  hover:text-black hover:bg-gray-400 px-2 py-1 rounded border border-gray-200">Sign In</Link>}
            {!user && <Link to="/signup" className="text-white bg-black hover:bg-gray-900 py-2 px-3  rounded">Sign Up</Link>}
            {user && <button onClick={handleLogout} className="text-gray-300  hover:text-black hover:bg-gray-400 px-2 py-1 rounded border border-gray-200">Logout</button>}
          </div>
        </div>
      </nav>
      {/* Sidebar for Mobile */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white font-bold">Menu</div>
            <div className="text-white text-2xl cursor-pointer" onClick={toggleSidebar}>
              <FaTimes />
            </div>
          </div>
          <div className="space-y-4">
          {user && <Link to="/" className="text-gray-300 hover:text-white block" onClick={toggleSidebar}>Home</Link>}
            <Link to="/about" className="text-gray-300 hover:text-white block" onClick={toggleSidebar}>About</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white block" onClick={toggleSidebar}>Contact</Link>
            {!user && <Link to="/signin" className="text-gray-300 hover:text-white block" onClick={toggleSidebar}>Sign In</Link>}
            {!user && <Link to="/signup" className="text-gray-300 hover:text-white block" onClick={toggleSidebar}>Sign Up</Link>}
            {user && <button onClick={() => { handleLogout(); toggleSidebar(); }} className="text-gray-300 hover:text-black hover:bg-gray-400 px-2 py-1 rounded border border-gray-200">Logout</button>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
