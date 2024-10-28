import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../shared/context/AuthContext';
import RegisterForm from '../components/RegisterForm';
import authCSS from '../styles/Auth.module.css';
import BasePage from './BasePage';
import AuthChip from '../components/AuthChip';

const RegisterPage = () => {
  const { register: registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    registerUser(data.usuario, data.email, data.password);
  };

  return (
    <BasePage>
      <div className={`formWrapper ${authCSS.formAuthWrapper}`}>
        <img src="/ucugram.svg" alt="UCU Gram" className={authCSS.logo} />
        <RegisterForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          isValid={isValid}
        />
      </div>
      <AuthChip
        title="¿Ya tenés cuenta?"
        action="Iniciar sesión"
        redirect="/login"
      />
    </BasePage>
  );
};

export default RegisterPage;
