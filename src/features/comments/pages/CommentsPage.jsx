// CommentsPage.jsx
import React from 'react';
import Modal from 'shared/components/Modal';

const CommentsPage = ({ postId, isOpen, onClose }) => {
  // Aquí puedes cargar los comentarios basados en el postId
  // const comments = fetchComments(postId);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2>Comentarios del Post {postId}</h2>
        {/* Renderiza los comentarios aquí */}
        <p>Aquí van los comentarios del post.</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </Modal>
  );
};

export default CommentsPage;
