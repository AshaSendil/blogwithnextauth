"use client"
import React, { useEffect, useState } from 'react';
import { FiBookmark, FiShare2 } from 'react-icons/fi';
import CommentSection from '../commentsection/page';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '../components/header/page';


const BlogDetail = (props) => {



  const [isBookmarked, setIsBookmarked] = useState(false);
  // get it from query


  const [apiPosts, setApiPosts] = useState([]);

 

  const listenToContent = () => {
    alert('Text-to-speech functionality will be implemented here.');
  };

  const shareContent = () => {
    alert('Sharing functionality will be implemented here.');
  };

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };


  const searchParams = useSearchParams()
  const search = searchParams.get('title');
  const session = useSession()

  const handleBlog = async () => {
    const url = `api/write?title=${search}`
    try {
      axios.get(url).then((res) => setApiPosts(res?.data));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    handleBlog();
  }, []);

  return (
   <>
   <Header/>
    <div className="max-w-2xl mx-auto mt-8 p-4 overflow-y-auto">
      <h1 className="text-4xl font-bold mb-4">{apiPosts.title}</h1>
      <p className="text-sm text-gray-600">By {session?.data?.user?.email}</p>

      {/* {blogData.images.map((image, index) => ( */}
        <img src={apiPosts?.imageUrl}  className="my-4 rounded-lg shadow-md" />
      {/* ))} */}

      <p className="text-lg mt-4"  >{apiPosts?.content}</p>

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
   </>

  );
};

export default BlogDetail;
