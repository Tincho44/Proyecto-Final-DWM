import { useContext, useEffect, useState } from 'react';
import Modal from 'shared/components/Modal';
import useCommentService from 'shared/services/CommentService';
import useUserService from '../../../shared/services/UserService';
import commentsPageCSS from '../styles/CommentsPage.module.css';
import PostHeader from '../../feed/components/PostHeader';
import PostFooter from '../../feed/components/PostFooter';
import { PostContext } from 'shared/context/PostContext';
import { AuthContext } from 'shared/context/AuthContext';

const CommentsPage = ({ post, isOpen, onClose }) => {

  if (!post || !post.comments) return null;

  const { createComment } = useCommentService();
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postLikeado, setPostLikeado] = useState(false);
  const { hitlikePost, hitUnlikePost } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const { getUserProfile } = useUserService();

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);
      const createdComment = await createComment(post._id, newComment);
      const username = await getUserProfile(createdComment.user);
      createdComment.username = username.data.user.username;
      setComments([...comments, createdComment]);
      setNewComment("");
    } catch (error) {
      console.error("Error al crear el comentario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={commentsPageCSS.modalContent}>
        <div className={commentsPageCSS.modalBody}>
          <div className={commentsPageCSS.imageContainer}>
            <img src={post.imageUrl} alt={post.caption} className={commentsPageCSS.postImage} />
          </div>
          <div className={commentsPageCSS.commentsContainer}>
            <div className={commentsPageCSS.header}>
              <PostHeader post={post} />
            </div>
            <div className={commentsPageCSS.commentsList}>

              {comments.map((comment) => (
                <div key={comment._id} className={commentsPageCSS.comment}>
                  <strong>{comment.user.username || comment.username}</strong>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
            <div className={commentsPageCSS.newCommentForm}>
              <PostFooter
                post={post}
                postLikeado={postLikeado}
                _handleLikeButton={_handleLikeButton}
                _handleCommentButton={() => { }}
                isCommentsOpen={false}
                handleCloseComments={() => { }}
              />
            </div>
            <div className={commentsPageCSS.newCommentForm}>
              <form onSubmit={handleCommentSubmit} className={commentsPageCSS.form}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escribe tu comentario..."
                  rows="3"
                ></textarea>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar comentario"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default CommentsPage;
