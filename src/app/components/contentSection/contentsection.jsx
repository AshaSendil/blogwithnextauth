"use client"
import React from 'react';
import ScrollableSection from '../scrollableSection/scrollablesection';
import Link from 'next/link';

const ContentSection = () => {
  // Sample array of blog posts
  const blogPosts = [
    {
      title: 'It happened on Medium November Roundup',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    },
    {
      title: 'Exploring the React Framework',
      content: 'React is a JavaScript library for building user interfaces...',
    },
    // Add more blog posts as needed
  ];

  const scrollableContent = (
    <div className='p-24'>
      {blogPosts.map((post, index) => (
        <Link key={index} href={`/blogdetail`}>
          <div className="mb-8 cursor-pointer"> 
            <h3 className='font-bold text-xl'>{post.title}</h3>
            <p className='break-words text-gray-700'>{post.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );

  const staticContent = (
    <div>
      <h2>Static Side</h2>
      {/* Add your static content elements */}
    </div>
  );

  return (
    <div>
      <ScrollableSection
        scrollableContent={scrollableContent}
        staticContent={staticContent}
      />
    </div>
  );
};
export default ContentSection;
