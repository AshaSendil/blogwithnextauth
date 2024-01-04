"use client"
import React, { useState } from 'react';
import { FiBookmark, FiShare2 } from 'react-icons/fi';
import CommentSection from '../commentsection/page';

// Mock data for demonstration
const blogData = {
  title: 'Sample Blog Title',
  author: 'John Doe',
  content: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec rutrum congue leo eget malesuada.
    <p>
      This is an example of a blog post content. It can include multiple paragraphs, images, and any HTML elements you need.
    </p>
    <p>
      You can add more content here as needed.
    </p>
  `,
  images: ['images/image1.jpg', ''],
};

const BlogDetail = (props) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const listenToContent = () => {
    alert('Text-to-speech functionality will be implemented here.');
  };

  const shareContent = () => {
    alert('Sharing functionality will be implemented here.');
  };

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 overflow-y-auto">
      <h1 className="text-4xl font-bold mb-4">{blogData.title}</h1>
      <p className="text-sm text-gray-600">By {blogData.author}</p>

      {blogData.images.map((image, index) => (
        <img key={index} src={image} alt={`Image ${index}`} className="my-4 rounded-lg shadow-md" />
      ))}

      <div className="text-lg mt-4" dangerouslySetInnerHTML={{ __html: blogData.content }} />

      <div className="flex items-center mt-8">
        <button
          className="flex items-center text-gray-600 mr-4"
          onClick={listenToContent}
        >
          <span className="mr-2">Listen to Content</span>
          <span role="img" aria-label="Speaker Emoji">
            🎧
          </span>
        </button>

        <button
          className="flex items-center text-gray-600 mr-4"
          onClick={shareContent}
        >
          <span className="mr-2">Share</span>
          <FiShare2 />
        </button>

        <button
          className="flex items-center text-gray-600"
          onClick={toggleBookmark}
        >
          <span className="mr-2">Bookmark</span>
          {isBookmarked ? (
            <FiBookmark color="#ed8936" />
          ) : (
            <FiBookmark color="#cbd5e0" />
          )}
        </button>
      </div>
      <CommentSection />

    </div>

  );
};

export default BlogDetail;
