import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Editor from './pages/Editor';
import EditPost from './pages/EditPost'; 
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/edit/:id" element={<EditPost />}/>
          <Route path="/my-blogs" element={<BlogFeed />} />
          <Route path="/post/:id" element={<BlogPost />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
