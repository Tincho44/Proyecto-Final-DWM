import React, { useContext, useState, useEffect } from 'react';
import postCSS from '../styles/Post.module.css';
import { PostContext } from 'shared/context/PostContext';
import { AuthContext } from 'shared/context/AuthContext';
import CommentsPage from 'features/comments/pages/CommentsPage';
import CommentsModal from '../../comments/components/CommentsModal';


function Post({ post }) {
  const [postLikeado, setPostLikeado] = useState(false);
  const [isCommentsOpen, setCommentsOpen] = useState(false);
  const { hitlikePost, hitUnlikePost } = useContext(PostContext);
  const { user } = useContext(AuthContext);

  const tiempoFormateado = (date) => {
    const ahora = new Date();
    const posteo = new Date(date);
    const diff = ahora - posteo;
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor(diff / (1000 * 60));
    const segundos = Math.floor(diff / 1000);

    if (dias > 0) {
      return `${dias}d`;
    }
    if (horas > 0) {
      return `${horas}h`;
    }
    if (minutos > 0) {
      return `${minutos}m`;
    }
    if (segundos > 0) {
      return `${segundos}s`;
    }
  }

  useEffect(() => {
    const liked = post.likes.includes(user._id);
    setPostLikeado(!!liked);
  }, [post.likes, user._id]);

  const _handleLikeButton = () => {
    if (postLikeado) {
      hitUnlikePost(id);
    } else {
      hitlikePost(id); 
    }
    setPostLikeado(!postLikeado);
  }

  const _handleCommentButton = () => {
    setCommentsOpen(true);
  }
  const handleCloseComments = () => {
    setCommentsOpen(false);
  };


  return (
    <div className={postCSS.post}>
      <div className={postCSS.postHeader}>
        <div className={postCSS.userInfo}>
          <img src={post.profilePicture} alt={post.username} className={postCSS.profilePicture} />
          <h3>{post.username}</h3>
          <div className={postCSS.postTime}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 25 25" fill="#C9C9C9FF">
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
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
          </svg>
        </button>
      </div>
      <img src={post.imageUrl} alt={post.caption} className={postCSS.postImage} onDoubleClick={_handleLikeButton} />
      <div className={postCSS.postFooter}>
        <div className={postCSS.postFooterRow}>
          <div className={postCSS.postActions}>
            <button className={postCSS.postAction} onClick={_handleLikeButton}>
              {postLikeado ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clipPath="url(#clip0_5369_116)">
                    <path d="M16.792 1.904C15.8839 1.87493 14.981 2.05109 14.1504 2.41935C13.3199 2.78762 12.5831 3.33851 11.995 4.031C11.4074 3.34053 10.6721 2.79091 9.84353 2.42276C9.01496 2.0546 8.11427 1.87732 7.20798 1.904C5.36285 1.97615 3.62136 2.77599 2.36432 4.1286C1.10728 5.48121 0.436977 7.27654 0.499982 9.122C0.499982 12.732 3.04998 14.949 5.51498 17.092C5.79798 17.338 6.08398 17.586 6.36798 17.839L7.39498 18.757C8.51502 19.8228 9.68925 20.8301 10.913 21.775C11.2368 21.9846 11.6143 22.0962 12 22.0962C12.3857 22.0962 12.7632 21.9846 13.087 21.775C14.3497 20.8013 15.56 19.7615 16.713 18.66L17.635 17.836C17.928 17.576 18.225 17.317 18.52 17.062C20.854 15.037 23.5 12.742 23.5 9.122C23.563 7.27654 22.8927 5.48121 21.6356 4.1286C20.3786 2.77599 18.6371 1.97615 16.792 1.904Z" fill="#FF3450" />
                  </g>
                  <defs>
                    <clipPath id="clip0_5369_116">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                  <g clipPath="url(#clip0_9_748)">
                    <path
                      d="M16.792 4.32585C18.1065 4.39851 19.3389 4.98775 20.2208 5.96515C21.1027 6.94255 21.5625 8.22889 21.5 9.54385C21.5 12.6158 18.848 14.5028 16.303 16.7658C13.791 19.0088 12.438 20.2348 12 20.5178C11.523 20.2088 9.85704 18.6948 7.69704 16.7658C5.14104 14.4938 2.50004 12.5888 2.50004 9.54385C2.43761 8.22889 2.89743 6.94255 3.7793 5.96515C4.66117 4.98775 5.89361 4.39851 7.20804 4.32585C7.93619 4.30378 8.6576 4.47103 9.30176 4.81125C9.94591 5.15147 10.4908 5.65301 10.883 6.26685C11.723 7.44185 11.863 8.02985 12.003 8.02985C12.143 8.02985 12.281 7.44185 13.113 6.26385C13.5031 5.64717 14.0482 5.14364 14.6937 4.80356C15.3393 4.46348 16.0629 4.29876 16.792 4.32585ZM16.792 2.32585C15.884 2.29677 14.981 2.47293 14.1505 2.8412C13.3199 3.20947 12.5832 3.76036 11.995 4.45285C11.4074 3.76237 10.6722 3.21276 9.84359 2.8446C9.01502 2.47644 8.11433 2.29916 7.20804 2.32585C5.36291 2.398 3.62142 3.19783 2.36438 4.55044C1.10734 5.90305 0.437038 7.69838 0.500043 9.54385C0.500043 13.1538 3.05004 15.3708 5.51504 17.5138C5.79804 17.7598 6.08404 18.0078 6.36804 18.2608L7.39504 19.1788C8.51508 20.2446 9.68931 21.252 10.913 22.1968C11.2368 22.4065 11.6143 22.518 12 22.518C12.3858 22.518 12.7633 22.4065 13.087 22.1968C14.3497 21.2231 15.5601 20.1833 16.713 19.0818L17.635 18.2578C17.928 17.9978 18.225 17.7388 18.52 17.4838C20.854 15.4588 23.5 13.1638 23.5 9.54385C23.563 7.69838 22.8927 5.90305 21.6357 4.55044C20.3787 3.19783 18.6372 2.398 16.792 2.32585Z"
                      fill="#262626"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_9_748">
                      <rect width="24" height="24" fill="white" transform="translate(0 0.421875)" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </button>
            <button className={postCSS.postAction} onClick={_handleCommentButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <g clipPath="url(#clip0_9_751)">
                  <path
                    d="M20.656 17.43C21.8711 15.3281 22.2794 12.8557 21.8047 10.4747C21.33 8.09371 20.0047 5.96696 18.0765 4.49177C16.1482 3.01657 13.7488 2.29384 11.3265 2.45859C8.90424 2.62334 6.6248 3.6643 4.91401 5.387C3.20323 7.1097 2.17811 9.39631 2.03018 11.8197C1.88224 14.243 2.6216 16.6373 4.11014 18.5553C5.59868 20.4733 7.73457 21.7838 10.1188 22.242C12.503 22.7002 14.9725 22.2747 17.066 21.045L22 22.422L20.656 17.43Z"
                    stroke="#262626"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_9_751">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.421875)" />
                  </clipPath>
                </defs>
              </svg>
            </button>
            {isCommentsOpen && (
              <CommentsPage post={post} isOpen={isCommentsOpen} onClose={handleCloseComments} />
            )}
            <button className={postCSS.postAction}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <g clipPath="url(#clip0_9_754)">
                  <path
                    d="M22 3.42188L9.21802 10.5049"
                    stroke="#262626"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.698 20.7559L22 3.42285H2L9.218 10.5059L11.698 20.7559Z"
                    stroke="#262626"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_9_754">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.421875)" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
          <button className={postCSS.postAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <g clipPath="url(#clip0_9_758)">
                <path
                  d="M20 21.4219L12 13.8619L4 21.4219V3.42188H20V21.4219Z"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_9_758">
                  <rect width="24" height="24" fill="white" transform="translate(0 0.421875)" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <p className={postCSS.postLikes}>{postLikeado ? <img src={post.profilePicture} alt={post.username} className={postCSS.miniProfilePicture} /> : ''}{post.likes.length} likes</p>
        <div className={postCSS.postCaption}>
          <p><span>{post.username}</span> {post.caption}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
