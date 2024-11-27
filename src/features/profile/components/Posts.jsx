import React from 'react';
import profileCSS from '../styles/Profile.module.css';
import NoData from 'shared/components/NoData';

const Posts = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <NoData text="Este usuario no tiene publicaciones" />
    );
  }

  return (
    <div className={profileCSS.posts}>
      {posts.map((post) => (
        <div key={post._id} className={profileCSS.post}>
          <img src={`http://64.23.228.143:3001/${post.imageUrl}`} alt="Post" />
        </div>
      ))}
    </div>
  );
};

export default Posts;
