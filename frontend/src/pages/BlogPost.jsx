import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { getPostById } from '../api'; 

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const components = {
    h2: ({node, ...props}) => <h2 className="mb-4" {...props} />,
    h3: ({node, ...props}) => <h3 className="mb-4" {...props} />,
    p: ({node, ...props}) => <p className="mb-4" {...props} />,
    pre: ({node, ...props}) => <pre className="mb-4" {...props} />,
    ul: ({node, ...props}) => <ul className="mb-4" {...props} />,
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const currentPost = await getPostById(id);
        setPost(currentPost);
      } catch (error) {
        setPost(null);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Post not found</h2>
          <Link to="/my-blogs" className="text-blue-500 mt-4 inline-block">Back to My Blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose lg:prose-xl max-w-none dark:prose-invert">
          <h1>{post.title}</h1>
          <p className="text-base text-gray-500 dark:text-gray-400">
            Published on {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <ReactMarkdown 
            rehypePlugins={[rehypeHighlight]}
            remarkPlugins={[remarkGfm]}
            components={components} 
          >
            {post.content}
          </ReactMarkdown>
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