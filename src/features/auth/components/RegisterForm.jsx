import React from 'react';
import css from '../styles/Auth.module.css';

const RegisterForm = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  isValid,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.authForm}>
      <div className={css.formGroup}>
        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          {...register('usuario', {
            required: 'El usuario es obligatorio',
            minLength: {
              value: 3,
              message: 'El usuario debe tener al menos 3 caracteres',
            },
          })}
        />
        {errors.usuario && <span className={css.error}>{errors.usuario.message}</span>}
      </div>
      <div className={css.formGroup}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          {...register('email', {
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Correo electrónico inválido',
            },
          })}
        />
        {errors.email && <span className={css.error}>{errors.email.message}</span>}
      </div>
      <div className={css.formGroup}>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          {...register('password', {
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 3,
              message: 'La contraseña debe tener al menos 3 caracteres',
            },
          })}
        />
        {errors.password && <span className={css.error}>{errors.password.message}</span>}
      </div>
      <button type="submit" disabled={!isValid}>
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
