import React, { useState, useContext } from 'react';
import { ProfileContext } from 'shared/context/ProfileContext';
import { UserContext } from 'shared/context/UserContext';

const ChangeDescription = ({ userId }) => {
  const [nuevaDescripcion, setDescripcion] = useState('');
  const { getProfile } = useContext(ProfileContext);
  const { updateDescription } = useContext(UserContext);

  const handleTextChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleUpload = async () => {
    try {
      await updateDescription(userId, nuevaDescripcion);
      alert("Descripción actualizada con éxito.");
      await getProfile(userId);
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Nueva descripción" onChange={handleTextChange} />
      <button onClick={handleUpload}>Cambiar</button>
    </div>
  );
};

export default ChangeDescription;
