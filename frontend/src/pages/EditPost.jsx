
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
// import { marked } from 'marked';
import toast from 'react-hot-toast';
import { getPostById, updatePost } from '../api';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        setTitle(post.title);
        setMarkdown(post.content);
      } catch (error) {
        toast.error('Failed to load post data.');
        navigate('/my-blogs');
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleUpdate = async () => {
    if (!title.trim() || !markdown.trim()) {
      toast.error('Please add both title and content');
      return;
    }
    try {
      await updatePost(id, { title, content: markdown });
      toast.success('Post updated successfully!');
      navigate(`/post/${id}`); 
    } catch (error) {
      toast.error('Failed to update post.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
        <input
          type="text"
          placeholder="Enter post title..."
          className="w-full px-4 py-2 text-xl font-bold border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="grid md:grid-cols-2 gap-6">
          {/* Editor Pane */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Editor</h2>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 text-sm bg-green-500 text-white hover:bg-green-600 rounded-md"
              >
                Update Post
              </button>
            </div>
            <textarea
              className="w-full h-[calc(100vh-350px)] p-4 border rounded-md"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
          </div>
          {/* Preview Pane */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <div
              className="prose max-w-none h-[calc(100vh-350px)] overflow-auto"/>
            {/* //   dangerouslySetInnerHTML={{ __html: marked(markdown) }} */}
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {markdown}
              </ReactMarkdown>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;