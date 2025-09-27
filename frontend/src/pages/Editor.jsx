import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import toast from 'react-hot-toast';

const Editor = () => {
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [lastSaved, setLastSaved] = useState(null);

  // Auto-save feature
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (markdown || title) {
        handleSave();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSaveTimer);
  }, [markdown, title]);

  const handleSave = () => {
    if (!title.trim() || !markdown.trim()) {
      toast.error('Please add both title and content');
      return;
    }

    const post = {
      id: Date.now(),
      title,
      content: markdown,
      createdAt: new Date().toISOString(),
    };

    // Get existing posts or initialize empty array
    const existingPosts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    localStorage.setItem('blog-posts', JSON.stringify([...existingPosts, post]));
    
    setLastSaved(new Date());
    toast.success('Post saved successfully!');
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
            {lastSaved && (
              <p className="text-sm text-gray-500 mt-2">
                Last saved: {new Date(lastSaved).toLocaleString()}
              </p>
            )}
          </div>

          {/* Preview Pane */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <div
              className="prose max-w-none h-[calc(100vh-300px)] overflow-auto"
              dangerouslySetInnerHTML={{ __html: marked(markdown) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;