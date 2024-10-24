import React from 'react';
import css from '../styles/Login.module.css';

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  navigate,
  isFormChanged,
}) => {
  return (
    <>
      <form onSubmit={handleLogin} className={css.loginForm}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
        <button type="submit" disabled={!isFormChanged}>
          Iniciar Sesión
        </button>
      </form>
      <div className="separator">
        <span>o inicia sesión con</span>
      </div>
      <div className={css.socialLogin}>
        <button
          className={css.socialLoginOption}
          onClick={() => navigate('/login/weba')}
        >
          WebAsignatura
        </button>
        <button
          className={css.socialLoginOption}
          onClick={() => navigate('/login/autogestion')}
        >
          AutoGestión
        </button>
      </div>
    </>
  );
};

export default LoginForm;
