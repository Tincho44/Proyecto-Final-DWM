import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../shared/context/AuthContext';
import RegisterForm from '../components/RegisterForm';
import registerCSS from '../styles/Register.module.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const { register, endMessage, endType, setEndMessage, setEndType } = useContext(AuthContext);
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (endType === 'success') {
            setEndMessage(null);
            setEndType(null);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }, [endType, navigate]);    

    const initialState = {
        usuario: '',
        email: '',
        password: '',
    };

    const ableToSend = () => {
        const hasChanged =
            usuario !== initialState.usuario ||
            email !== initialState.email ||
            password !== initialState.password;
        const notEmpty =
            usuario.trim() !== '' && email.trim() !== '' && password.trim() !== '';
        return hasChanged && notEmpty;
    };


    const handleRegister = (e) => {
        e.preventDefault();
        register(usuario, email, password);
    };

    return (
        <div className={registerCSS.registerPage}>
            <div className={`formWrapper ${registerCSS.formRegisterWrapper}`}>
                <img src="/ucugram.svg" alt="UCU Gram" />
                <RegisterForm
                    usuario={usuario}
                    setUsuario={setUsuario}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleRegister={handleRegister}
                    ableToSend={ableToSend()}
                />
                {endType && (
                    <div className={`message ${endType}`}>
                        {endMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterPage;
