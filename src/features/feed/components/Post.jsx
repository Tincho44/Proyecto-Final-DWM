import React, { useContext, useState, useEffect } from 'react';
import postCSS from '../styles/Post.module.css';
import { PostContext } from 'shared/context/PostContext';
import { AuthContext } from 'shared/context/AuthContext';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

function Post({ post }) {
  const [postLikeado, setPostLikeado] = useState(false);
  const [isCommentsOpen, setCommentsOpen] = useState(false);
  const { hitlikePost, hitUnlikePost } = useContext(PostContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const liked = post.likes.includes(user._id);
    setPostLikeado(!!liked);
  }, [post.likes, user._id]);

  const _handleLikeButton = () => {
    if (postLikeado) {
      hitUnlikePost(post._id);
    } else {
      hitlikePost(post._id);
    }
    setPostLikeado(!postLikeado);
  };

  const _handleCommentButton = () => {
    setCommentsOpen(true);
  };

  const handleCloseComments = () => {
    setCommentsOpen(false);
  };

  return (
    <div className={postCSS.post}>
      <PostHeader post={post} />
      <img
        src={post.imageUrl}
        alt={post.caption}
        className={postCSS.postImage}
        onDoubleClick={_handleLikeButton}
      />
      <PostFooter
        user={user}
        post={post}
        postLikeado={postLikeado}
        _handleLikeButton={_handleLikeButton}
        _handleCommentButton={_handleCommentButton}
        isCommentsOpen={isCommentsOpen}
        handleCloseComments={handleCloseComments}
        showCommentsExtendedFooter={true}
      />
    </div>
  );
}

export default Post;
