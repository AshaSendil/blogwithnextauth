"use client";
import React, { useState } from "react";
import CommentModal from "./commentModal/page";
import { FaRegComment } from "react-icons/fa";



const CommentSection = (props) => {
  console.log(props)
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrevious,setIsPrevious] = useState(false)

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddComment = (newComment) => {
    const newCommentObject = {
      author: "User",
      content: newComment,
    };

    setComments((prevComments) => [...prevComments, newCommentObject]);
  };

  return (
    <>
    <div className="mt-8 flex justify-between">
      <button className="text-gray-600 mb-4" onClick={openModal}>
        <FaRegComment />
      </button>

      {isModalOpen && (
        <CommentModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onAddComment={handleAddComment}
          getComment={getComment}
        />
      )}

      {/* Eye icon to view previous comments */}
      <div>
        <span
          className="cursor-pointer text-gray-600"
          onClick={() => setIsPrevious(!isPrevious)}
        >
          👁
        </span>
        {console.log(isPrevious,"isPrevious")}
      </div>
      </div>

      {/* Render previous comments if comments is defined */}
      {isPrevious && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Previous Comments</h3>
          {/* Dummy Previous Comment */}
          <div className="bg-gray-100 p-3 my-2 rounded">
            <p className="font-bold">{dummyPreviousComment.author}</p>
            <p>{dummyPreviousComment.content}</p>
          </div>

          {/* Render actual previous comments */}
          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-3 my-2 rounded">
              <p className="font-bold">{comment.author}</p>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      )}
   
    </>
  );
};

export default CommentSection;
