import  { useState, useEffect } from 'react';

import  useCommentService  from 'shared/services/CommentService';

const CommentsModal = ({ postId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { getCommentsByPostId, createComment } = useCommentService();

  useEffect(() => {
    // Cargar comentarios del post al abrir el modal
    getCommentsByPostId(postId).then(setComments).catch(console.error);
  }, [postId]);

  const handleSendComment = async () => {
    if (!newComment.trim()) return;
    try {
      const createdComment = await createComment(postId, newComment);
      setComments([...comments, createdComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }
  };

  return (
    <div className={modalCSS.modalWrapper}>
      <div className={modalCSS.modalContent}>
        <button className={modalCSS.closeButton} onClick={onClose}>Cerrar</button>
        
        {/* Lista de comentarios */}
        <div className={modalCSS.commentsList}>
          {comments.map((comment) => (
            <div key={comment._id} className={modalCSS.comment}>
              <strong>{comment.user.username}</strong>: {comment.text}
            </div>
          ))}
        </div>

        {/* Campo para nuevo comentario */}
        <div className={modalCSS.newComment}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe un comentario..."
          />
          <button onClick={handleSendComment}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
