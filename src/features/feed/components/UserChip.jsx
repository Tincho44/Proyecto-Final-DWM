import React, { useContext } from 'react';
import chipCSS from '../styles/UserChip.module.css';


function UserChip({ user }) {

    const _handleViewUserButton = () => {
        console.log("Ver perfil de", user.username);

    }

    return (
        <div className={chipCSS.userChip}>
            <div>
                <img src={user.profilePicture} alt="profile" className={chipCSS.profilePicture} />
                <p className={chipCSS.userName}>{user.username}</p>
            </div>
            <div className={chipCSS.userInfo}>
                <button className={chipCSS.userName} onClick={_handleViewUserButton}>
                    Ver perfil
                </button>
            </div>
        </div>
    );
};

export default UserChip;