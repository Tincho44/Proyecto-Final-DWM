import React from 'react';

const CommentsList = ({ comments }) => (
  <div className="comments-list">
    {comments.map((comment, index) => (
      <div key={index} className="comment">
        <p><strong>{comment.username}:</strong> {comment.text}</p>
      </div>
    ))}
  </div>
);

export default CommentsList;
