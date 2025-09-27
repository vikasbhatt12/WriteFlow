import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, deletePost } from "../api";
import toast from 'react-hot-toast';

const BlogFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const savedPosts = await getAllPosts();
        setPosts(savedPosts);
      } catch (err) {
        console.error("Failed to fetch posts");
      }
    };

    fetchPosts();
  }, []);

   const handleDelete = async (id) => {
    // Ask for confirmation before deleting
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        // Remove the deleted post from the state to update the UI
        setPosts(posts.filter(post => post._id !== id));
        toast.success('Post deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete the post.');
      }
    }
  };

  const getPostPreview = (content) => {
    const firstFewLines = content.split("\n").slice(0, 4).join(" ");
    return firstFewLines.length > 150
      ? `${firstFewLines.substring(0, 150)}...`
      : firstFewLines;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-10">My Blogs</h1>

        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-2xl font-bold mb-2">
                  <Link
                    to={`/post/${post._id}`}
                    className="text-gray-800 hover:text-blue-600"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-4">
                  {getPostPreview(post.content)}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Read More &rarr;
                </Link>
                <div className="space-x-2">
                    <Link to={`/edit/${post._id}`} className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500">
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(post._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>No blog posts yet. Start writing one!</p>
            <Link
              to="/editor"
              className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Write a Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogFeed;
