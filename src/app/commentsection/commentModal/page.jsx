// CommentModal.jsx
import React from 'react';

const CommentModal = ({ isOpen, onRequestClose, onAddComment, comments }) => {
  const [newComment, setNewComment] = React.useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    onAddComment(newComment);
    setNewComment('');
  };

  const handleClose = () => {
    onRequestClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="absolute w-full h-full bg-gray-800 opacity-50" onClick={handleClose}></div>
      <div className="bg-white p-4 max-w-md mx-auto rounded-md z-50 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Add a Comment</h2>
        <form onSubmit={handleAddComment} className="mb-4">
          <textarea
            placeholder="Add your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border p-2 w-full mb-2"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Comment
          </button>
        </form>

        {/* Display Current Comments */}
        {comments?.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-2">Comments</h3>
            {comments?.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-3 my-2 rounded">
                <p className="font-bold">{comment.author}</p>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentModal;
