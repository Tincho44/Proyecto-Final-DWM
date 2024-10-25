import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../shared/context/AuthContext';
import RegisterForm from '../components/RegisterForm';
import authCSS from '../styles/Auth.module.css';
import { useNavigate } from 'react-router-dom';
import BasePage from './BasePage';
import AuthChip from '../components/AuthChip';

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
        <BasePage>
            <div className={`formWrapper ${authCSS.formAuthWrapper}`}>
                <img src="/ucugram.svg" alt="UCU Gram" className={authCSS.logo} />
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
            <AuthChip
                title='¿Ya tenés cuenta?'
                action='Iniciar sesión'
                redirect='/login'
            />
        </BasePage>
    );
};

export default RegisterPage;
