import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const UnAuthRoute = () => {
    let navigator = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setTimeout(() => {
            if (user) {
                navigator('/');
            }
        }, 10);
    }, [user, navigator]);

    return <Outlet />;
};

export default UnAuthRoute;
