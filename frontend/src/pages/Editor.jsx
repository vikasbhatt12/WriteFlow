import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
// import { marked } from 'marked';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; 
import { createPost } from '../api'; 

const Editor = () => {
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const navigate = useNavigate();

  // 1. Define custom components with Tailwind classes to add spacing
  const components = {
    h2: ({node, ...props}) => <h2 className="mb-4" {...props} />,
    h3: ({node, ...props}) => <h3 className="mb-4" {...props} />,
    p: ({node, ...props}) => <p className="mb-4" {...props} />,
    pre: ({node, ...props}) => <pre className="mb-4" {...props} />,
    ul: ({node, ...props}) => <ul className="mb-4" {...props} />,
  };


  const handleSave = async () => {
    if (!title.trim() || !markdown.trim()) {
      toast.error('Please add both title and content');
      return;
    }

    try {
      const newPost = { title, content: markdown };
      await createPost(newPost); 
      
      toast.success('Post saved successfully!');
      navigate('/my-blogs'); 
    } catch (error) {
      toast.error('Failed to save the post.');
    }
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    toast.success('Markdown copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter post title..."
            className="w-full px-4 py-2 text-xl font-bold border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Editor Pane */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Editor</h2>
              <div className="space-x-2">
                <button
                  onClick={handleCopyMarkdown}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Copy Markdown
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded"
                >
                  Save
                </button>
              </div>
            </div>
            <textarea
              className="w-full h-[calc(100vh-300px)] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Write your blog post in Markdown..."
            />
          </div>

          {/* Preview Pane */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <div
              className="prose max-w-none h-[calc(100vh-300px)] overflow-auto" >
              {/* // dangerouslySetInnerHTML={{ __html: marked(markdown) }} */}
              <ReactMarkdown 
                rehypePlugins={[rehypeHighlight]}
                remarkPlugins={[remarkGfm]}>
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;