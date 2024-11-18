import { useState, useEffect } from 'react';
import Modal from 'shared/components/Modal';
import useCommentService from 'shared/services/CommentService';
import PropTypes from 'prop-types'; 

const CommentsPage = ({ postId, isOpen, onClose }) => {
  // Aquí puedes cargar los comentarios basados en el postId
  // const comments = fetchComments(postId);

  const { getComment, deleteComment } = useCommentService();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getComment(postId); // Aquí se asume que getComment devuelve los comentarios de un post
      setComments(fetchedComments);
    };

    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, postId, getComment]);

   // Función para manejar la eliminación de un comentario
   const handleDelete = async (commentId) => {
    // Llamamos a deleteComment con el postId y el commentId
    await deleteComment(postId, commentId);
    // Actualizamos el estado para eliminar el comentario del frontend
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2>Comentarios del Post {postId}</h2>
        {/* Renderiza los comentarios aquí */}
        <div>
          {comments.length === 0 ? (
            <p>No hay comentarios aún.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id}>
                <p>{comment.content}</p>
                <p><strong>Autor:</strong> {comment.author}</p>
                <button onClick={() => handleDelete(comment.id)}>Eliminar</button>
              </div>
            ))
          )}
        </div>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </Modal>
  );
};

// Validación de props
CommentsPage.propTypes = {
  postId: PropTypes.string.isRequired,  // O el tipo adecuado, según el tipo de postId
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CommentsPage;
