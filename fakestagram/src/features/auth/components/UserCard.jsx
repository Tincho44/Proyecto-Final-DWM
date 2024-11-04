import React from 'react';
import './UserCard.css';

const UserCard = () => {
        return (
        <div className="user-card">
                <img src="ruta-de-la-imagen.jpg" alt="User" className="user-image" />
            <div className="button-container">
                <button className="user-button">Botón 1</button>
                <button className="user-button">Botón 2</button>
            </div>
        </div>
    );
};

export default UserCard;