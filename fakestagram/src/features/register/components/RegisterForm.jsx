import React from 'react';
import css from '../styles/Register.module.css';

const RegisterForm = ({
  usuario,
  setUsuario,
  email,
  setEmail,
  password,
  setPassword,
  handleRegister,
  ableToSend,
}) => {
  return (
    <form onSubmit={handleRegister} className={css.registerForm}>
      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
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
      <button type="submit" disabled={!ableToSend}>
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
