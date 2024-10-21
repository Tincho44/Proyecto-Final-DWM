import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = () => {
    let navigator = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigator('/login');
        }
    }, [user, navigator]);

    return user ? <Outlet /> : null;
};

export default PrivateRoute;
