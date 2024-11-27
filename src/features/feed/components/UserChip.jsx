import React from 'react';
import { useNavigate } from 'react-router-dom';
import chipCSS from '../styles/UserChip.module.css';

function UserChip({ user }) {
  const navigate = useNavigate();

  const _handleViewUserButton = () => {
    navigate(`/profile/${user._id}`);
  };

  return (
    <div className={chipCSS.userChip}>
      <div>
        <img
          src={user.profilePicture}
          alt="profile"
          className={chipCSS.profilePicture}
        />
        <p className={chipCSS.userName}>{user.username}</p>
      </div>
      <div className={chipCSS.userInfo}>
        <button
          className={chipCSS.userName}
          onClick={_handleViewUserButton}
        >
          Ver perfil
        </button>
      </div>
    </div>
  );
}

export default UserChip;
