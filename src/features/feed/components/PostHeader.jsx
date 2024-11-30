import React from 'react';
import { useNavigate } from 'react-router-dom';
import postCSS from '../styles/Post.module.css';
import { FiMoreHorizontal } from 'react-icons/fi';


function PostHeader({ post }) {
  const navigate = useNavigate();

  const tiempoFormateado = (date) => {
    const ahora = new Date();
    const posteo = new Date(date);
    const diff = ahora - posteo;
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor(diff / (1000 * 60));
    const segundos = Math.floor(diff / 1000);

    if (dias > 0) return `${dias}d`;
    if (horas > 0) return `${horas}h`;
    if (minutos > 0) return `${minutos}m`;
    if (segundos > 0) return `${segundos}s`;
    return 'Just now';
  };

  return (
    <div className={postCSS.postHeader}>
      <div
        className={postCSS.userInfo}
        onClick={() => navigate(`/profile/${post.user._id}`)}
      >
        <img
          src={post.user.profilePicture}
          alt={post.user.username}
          className={postCSS.profilePicture}
        />
        <h3>{post.user.username}</h3>
        <div className={postCSS.postTime}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 25 25"
            fill="#C9C9C9FF"
          >
            <g clipPath="url(#clip0_9_745)">
              <path
                d="M12 14.4219C13.1046 14.4219 14 13.5265 14 12.4219C14 11.3173 13.1046 10.4219 12 10.4219C10.8954 10.4219 10 11.3173 10 12.4219C10 13.5265 10.8954 14.4219 12 14.4219Z"
                stroke="#8E8E8E"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <span>{tiempoFormateado(post.createdAt)}</span>
        </div>
      </div>
      <button className={postCSS.postOptions}>
        <FiMoreHorizontal size={24} color="#262626" />
      </button>
    </div>
  );
}

export default PostHeader;
