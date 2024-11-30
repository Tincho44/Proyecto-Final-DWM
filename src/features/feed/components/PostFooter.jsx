import React from 'react';
import postCSS from '../styles/Post.module.css';
import CommentsPage from 'features/comments/pages/CommentsPage';
import { FiHeart, FiBookmark, FiSend, FiMessageCircle } from 'react-icons/fi';

function PostFooter({
    user,
    post,
    postLikeado,
    _handleLikeButton,
    _handleCommentButton,
    isCommentsOpen,
    handleCloseComments,
    showCommentsExtendedFooter,
}) {
    return (
        <div className={postCSS.postFooter}>
            <div className={postCSS.postFooterRow}>
                <div className={postCSS.postActions}>
                    <button className={postCSS.postAction} onClick={_handleLikeButton}>
                        {postLikeado ? (
                            <FiHeart size={24} color="#ed4956" fill='#ed4956' />
                        ) : (
                            <FiHeart size={24} color="#262626" />
                        )}
                    </button>
                    <button className={postCSS.postAction} onClick={_handleCommentButton}>
                        <FiMessageCircle size={24} color="#262626" />
                    </button>
                    {isCommentsOpen && (
                        <CommentsPage
                            post={post}
                            isOpen={isCommentsOpen}
                            onClose={handleCloseComments}
                        />
                    )}
                    <button className={postCSS.postAction}>
                        <FiSend size={24} color="#262626" />
                    </button>
                </div>
                <button className={postCSS.postAction}>
                    <FiBookmark size={24} color="#262626" />
                </button>
            </div>
            <p className={postCSS.postLikes}>
                {showCommentsExtendedFooter && postLikeado ? (
                    <img
                        src={user.profilePicture}
                        alt={post.user.username}
                        className={postCSS.miniProfilePicture}
                    />
                ) : null}
                {post.likes.length} likes
            </p>
            {showCommentsExtendedFooter ? (
                <div className={postCSS.postCaption}>
                    <p>
                        <span>{post.user.username}</span> {post.caption}
                    </p>
                </div>
            ) : null}
            {showCommentsExtendedFooter && post.comments.length > 0 && (
                <div className={postCSS.postComments} onClick={_handleCommentButton}>
                    <p>Ver los {post.comments.length} comentarios</p>
                </div>
            )}
        </div>
    );
}

export default PostFooter;
