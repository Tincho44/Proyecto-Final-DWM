import React, { useState, useContext } from 'react';
import { ProfileContext } from 'shared/context/ProfileContext';
import { UserContext } from 'shared/context/UserContext';
import profileCSS from '../styles/Profile.module.css';
import { toast } from 'react-toastify';

const ChangePicture = ({ user }) => {
  const [selectedURL, setSelectedFile] = useState('');
  const { getProfile } = useContext(ProfileContext);
  const { editUserProfile } = useContext(UserContext);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedURL) return;

    try {
      const formData = new FormData();
      formData.append('profilePicture', selectedURL);
      await editUserProfile(formData);
      toast.success('Foto de perfil actualizada con éxito.');
      await getProfile(user._id);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <div className={profileCSS.changePicture}>
      <h2>Cambiar Foto de Perfil</h2>
      <input
        type="text"
        placeholder="Ingrese la URL de la nueva imagen"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Cambiar</button>
    </div>
  );
};

export default ChangePicture;
