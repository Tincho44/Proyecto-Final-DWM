import React, { useState, useContext } from 'react';
import { ProfileContext } from 'shared/context/ProfileContext';
import { UserContext } from 'shared/context/UserContext';
import profileCSS from '../styles/Profile.module.css';
import { toast } from 'react-toastify';

const ChangeDescription = ({ userId }) => {
  const [nuevaDescripcion, setDescripcion] = useState('');
  const { getProfile } = useContext(ProfileContext);
  const { editUserProfile } = useContext(UserContext);

  const handleTextChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('description', nuevaDescripcion);
      await editUserProfile(formData);
      toast.success('Descripción actualizada con éxito.');
      await getProfile(userId);
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };

  return (
    <div className={profileCSS.changeDescription}>
      <h2>Cambiar Descripción</h2>
      <input
        type="text"
        placeholder="Nueva descripción"
        onChange={handleTextChange}
      />
      <button onClick={handleUpload}>Cambiar</button>
    </div>
  );
};

export default ChangeDescription;
