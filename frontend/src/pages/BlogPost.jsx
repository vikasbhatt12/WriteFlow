import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    const currentPost = savedPosts.find(p => p.id.toString() === id);
    setPost(currentPost);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Post not found</h2>
          <Link to="/my-blogs" className="text-blue-500 mt-4 inline-block">Back to My Blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose lg:prose-xl max-w-none">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {post.title}
          </h1>
          <p className="text-base text-gray-500">
            Published on {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <div dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
        </article>
        <div className="mt-10">
          <Link to="/my-blogs" className="text-blue-500 hover:text-blue-700">
            &larr; Back to My Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;