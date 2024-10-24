import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../shared/context/AuthContext';
import LoginForm from '../components/LoginForm';
import loginCSS from '../styles/Login.module.css';
import registerCSS from '../../register/styles/Register.module.css';
import { useNavigate } from 'react-router-dom';

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
        <div className={loginCSS.loginPage}>
            <div className={`formWrapper ${loginCSS.formLoginWrapper}`}>
                <img src="/ucugram.svg" alt="UCU Gram" />
                <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    navigate={navigate}
                    isFormChanged={isFormChanged()}
                />
                {endType && (
                    <div className={`message ${endType}`}>
                        {endMessage}
                    </div>
                )}
            </div>
            <div className={`formWrapper ${registerCSS.miniForm}`}>
                <p>¿No tenés cuenta?</p>
                <a className={registerCSS.toRegister} href="/register">
                    Regístrate
                </a>
            </div>
        </div>
    );
};

export default LoginPage;
