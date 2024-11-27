import React, { useState, useContext } from 'react';
import { ProfileContext } from 'shared/context/ProfileContext';
import { UserContext } from 'shared/context/UserContext';

const ChangePicture = ({ user }) => {
  const [selectedURL, setSelectedFile] = useState('');
  const { getProfile } = useContext(ProfileContext);
  const { updateProfilePicture } = useContext(UserContext);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedURL) return;

    try {
      await updateProfilePicture(user._id, selectedURL);
      alert("Foto de perfil actualizada con éxito.");
      await getProfile(user._id);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <div>
      <input type="text" onChange={handleFileChange} />
      <button onClick={handleUpload}>Cambiar</button>
    </div>
  );
};

export default ChangePicture;
