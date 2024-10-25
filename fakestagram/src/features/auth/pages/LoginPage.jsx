import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../shared/context/AuthContext';
import LoginForm from '../components/LoginForm';
import authCSS from '../styles/Auth.module.css';
import { useNavigate } from 'react-router-dom';
import BasePage from './BasePage';
import AuthChip from '../components/AuthChip';

const LoginPage = () => {
    const { login, endMessage, endType, setEndMessage, setEndType, user } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const initialState = {
        email: '',
        password: '',
    };

    useEffect(() => {
        if (endType === 'success') {
            setEndMessage(null);
            setEndType(null);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    }, [endType, navigate]);

    const isFormChanged = () => {
        const hasChanged =
            email !== initialState.email || password !== initialState.password;
        const notEmpty = email.trim() !== '' && password.trim() !== '';
        return hasChanged && notEmpty;
    };


    const handleLogin = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <BasePage>
                <div className={`formWrapper ${authCSS.formAuthWrapper}`}>
                    <img src="/ucugram.svg" alt="UCU Gram" className={authCSS.logo} />
                    <LoginForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        handleLogin={handleLogin}
                        navigate={navigate}
                        isFormChanged={isFormChanged()} />
                    {endType && (
                        <div className={`message ${endType}`}>
                            {endMessage}
                        </div>
                    )}
                </div>
                <AuthChip
                    title='¿No tenés cuenta?'
                    action='Regístrate'
                    redirect='/register'
                />
        </BasePage>
    );
};

export default LoginPage;
