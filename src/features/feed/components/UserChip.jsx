import React, { useContext } from 'react';
import chipCSS from '../styles/UserChip.module.css';

const UserChip = (user, currentUser) => {


    const isFollowing = () => {
        user.user.friends.includes(currentUser._id);
    }

    return (
        <div className={chipCSS.userChip}>
            <div>
                <img src={user.user.profilePicture} alt="profile" className={chipCSS.profilePicture} />
                <p className={chipCSS.userName}>{user.user.username}</p>
            </div>
            <div className={chipCSS.userInfo}>
                <button className={chipCSS.userName}>{isFollowing() ? 'Dejar de seguir' : 'Seguir'}</button>
            </div>
        </div>
    );
};

export default UserChip;