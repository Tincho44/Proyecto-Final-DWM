import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import navbarCSS from '../styles/Bars.module.css';
import { AuthContext } from '../context/AuthContext';
import { FiHeart, FiHome, FiPlusSquare, FiUser, FiLogOut } from 'react-icons/fi';

function NavBar() {
    const { logout, user } = useContext(AuthContext);

    const _exitButton = () => {
        logout();
    }

    const isSelected = (path) => {
        if (window.location.pathname.includes(path)) {
            return navbarCSS.selected;
        }
    }

    return (
        <div className={navbarCSS.navbar}>
            <div className={navbarCSS.logo}>
                <img src="/ucugram.svg" alt="UCU Gram" className={navbarCSS.logo} />
            </div>
            <nav className={navbarCSS.navigation}>
                <ul>
                    <li>
                        <Link to="/" className={navbarCSS.navItem + ' ' + isSelected('/')}>
                            <FiHome size={22} />
                            <span>Feed</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/notifications" className={navbarCSS.navItem + ' ' + isSelected('/notifications')}>
                            <FiHeart size={22} />
                            <span>Notificaciones</span>
                        </Link>
                    </li>
                    <li className={navbarCSS.navItemOnlyDesk}>
                        <Link to="/create-post" className={navbarCSS.navItem + ' ' + isSelected('/create-post')}>
                            <FiPlusSquare size={22} />
                            <span>Postear</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className={`${navbarCSS.navigation} ${navbarCSS.extras}`}>
                <ul>
                    <li>
                        <Link to={`/profile/${user._id}`} className={navbarCSS.navItem + ' ' + isSelected('/profile')}>
                            <FiUser size={22} />
                            <span>Perfil</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={_exitButton} className={navbarCSS.navItem}>
                            <FiLogOut size={22} />
                            <span>Salir</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;
