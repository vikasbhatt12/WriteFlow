import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Welcome to MarkItDown</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl">
        A modern, responsive, and intuitive Markdown-based blog where your ideas take center stage. 
        Create, edit, and share your thoughts with a seamless writing experience.
      </p>
      <div className="space-x-4">
        <Link 
          to="/editor"
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Start Writing
        </Link>
        <Link 
          to="/my-blogs"
          className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105"
        >
          View My Blogs
        </Link>
      </div>
    </div>
  );
};

export default Home;