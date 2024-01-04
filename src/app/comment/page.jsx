import React from 'react';

const Comment = ({ author, content }) => {
  console.log(author, "a", content);

  return (
    <div className="bg-gray-100 p-3 my-2 rounded">
      <p className="font-bold">{author}</p>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
