"use client";
import React, { useState, useEffect } from "react";
import CommentModal from "./commentModal/page";
import { FaRegClock, FaRegComment, FaRegUser } from "react-icons/fa";
import axios from "axios";
import { useSession } from "next-auth/react";
import moment from "moment";

const CommentSection = (props) => {
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);
  const [getComment, setGetComment] = useState([]);
  const session = useSession();

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

  const handleBlog = async () => {
    const url = `api/detailsComment`;
    try {
      const res = await axios.get(url);
      setGetComment(res?.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    handleBlog();
  }, []);

  console.log(getComment, "ge");

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
        </div>
      </div>

      {isPrevious && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Previous Comments</h3>

          {console.log(session)}
          {getComment.map((comment, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-500 p-5 my-5 rounded">
              <p>{comment.comment}</p>
              <div className="flex dark:text-black float-left">
              <FaRegClock fontSize={12}/>&nbsp;
              <p className="text-xs">{moment(comment?.createdAt).format("MMMM Do YYYY, h:mm")}</p>

                </div>
              <div className="flex float-right">
                <FaRegUser />{" "}
                <p className="text-xs">
                  {session?.data?.user?.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CommentSection;
