import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Editor from './pages/Editor';
import BlogFeed from './pages/BlogFeed';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/my-blogs" element={<BlogFeed />} />
          <Route path="/post/:id" element={<BlogPost />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
