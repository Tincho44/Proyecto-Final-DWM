import { useState } from 'react';
import Modal from 'shared/components/Modal';
import useCommentService from 'shared/services/CommentService';
import PropTypes from 'prop-types';
import useUserService from '../../../shared/services/UserService';

const CommentsPage = ({ post, isOpen, onClose }) => {

  if (!post || !post.comments) {
    return null;
  }
  const { createComment } = useCommentService();
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getUserProfile } = useUserService()


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);
      const createdComment = await createComment(post._id, newComment);
      const username= await getUserProfile(createdComment.user);
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
      <div style={{ maxWidth: '500px', padding: '20px' }}>
        <h2>Comentarios</h2>
        <div
          style={{
            maxHeight: '300px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
          }}
        >
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {comments.map((comment) => (
              <li
                key={comment._id}
                style={{
                  marginBottom: '10px',
                  borderBottom: '1px solid #e0e0e0',
                  paddingBottom: '10px',
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong>{comment.user.username || comment.username}</strong>
                </p>
                <p style={{ margin: 0 }}>{comment.content}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Formulario para agregar un nuevo comentario */}
        <form onSubmit={handleCommentSubmit} style={{ marginTop: '20px' }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe tu comentario..."
            rows="3"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              resize: 'none',
            }}
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: isSubmitting ? '#ccc' : '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? "Enviando..." : "Enviar comentario"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

CommentsPage.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        user: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
        }),
      })
    ),
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CommentsPage;
