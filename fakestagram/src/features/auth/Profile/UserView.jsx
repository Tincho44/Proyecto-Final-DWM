import React, { useEffect, useState, useContext } from "react";
import useApi from "../../../shared/hooks/useApi";
import '../styles/Profile.css';
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../shared/context/AuthContext";

function CambiarFoto({ usuario, fetchUser }) {
  const { doRequest } = useApi();
  const [selectedURL, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target);
    console.log(event.target)
  };

  const handleUpload = async () => {
    if (!selectedURL) return;

    const formData = new FormData();
    formData.append("profilePicture", selectedURL);

    try {
      await doRequest(`user/profile/edit`, "PUT", formData, true);
      alert("Foto de perfil actualizada con éxito.");
      fetchUser(); // Actualiza el perfil después del cambio de foto
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };
  

  return (
    <div>
      <input type="text" onChange={handleFileChange} /> 
      <button className="cambiarFoto" onClick={handleUpload}>Cambiar</button>
    </div>
  );
}


function CambiarDescripcion({ userId, fetchUser }) {
  const { doRequest } = useApi();
  const [nuevaDescripcion, setDescripcion] = useState("");

  const handleTextChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleUpload = async () => {
    try {
      await doRequest(`user/profile/edit`, 'PUT', { description: nuevaDescripcion }, true);
      alert("Descripción actualizada con éxito.");
      fetchUser(); // Actualiza el perfil después del cambio de descripción
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Nueva descripción" onChange={handleTextChange} />
      <button className="cambiarDescripcion" onClick={handleUpload}>Cambiar</button>
    </div>
  );
}

function FotoPerfil({ usuario }) {
  console.log(usuario)
  return (
    <div className="FotoPerfil">
    <h1 className="Username">{usuario.user.username}</h1>
      <img src={usuario.user.profilePicture} alt="Foto de perfil" />
      {usuario && usuario.user ? ( 
        <p className="DescUser">{usuario.user.username}</p>
      ) : (
        <h2>Cargando...</h2> 
      )}
      <p className="DescUser">{usuario.user.description}</p>
    </div>
  );
}

function DatosUsuario({ usuario, myProfile, isFriend, setFriendStatus, fetchUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { doRequest } = useApi();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddFriend = async () => {
    try {
      await doRequest(`user/add-friend/${usuario.user._id}`, "POST", null, true);
      setFriendStatus(true);
      fetchUser(); 
    } catch (error) {
      console.error("Error al añadir amigo:", error);
    }
  };

  const handleRemoveFriend = async () => {
    try {
      await doRequest(`user/remove-friend/${usuario.user._id}`, "DELETE", null, true);
      setFriendStatus(false);
      fetchUser(); // Actualiza el perfil después de eliminar amigo
    } catch (error) {
      console.error("Error al eliminar amigo:", error);
    }
  };
  
  return (
      <div className="Datos">
        <div className="Friends">
          <p className="InformacionBasica">{usuario.user.friends.length}<br />Amigos</p>
          <p className="InformacionBasica">{usuario.posts.length}<br />Posts</p>
        </div>
        
        {myProfile && usuario ? (
          <>
            <button className="editProfileButton" onClick={toggleModal}>
              Editar perfil
            </button>
            {isModalOpen && (
              <div className="modalOverlay">
                <div className="modalContent">
                  <button className="closeModal" onClick={toggleModal}>X</button>
                  <CambiarFoto usuario={usuario} />
                  <CambiarDescripcion userId={usuario.user._id} />
                </div>
              </div>
            )}
          </>
        ) : (
          isFriend ? (
            <button className="removeFriendButton" onClick={handleRemoveFriend}>
              Eliminar amigo
            </button>
          ) : (
            <button className="addFriendButton" onClick={handleAddFriend}>
              Añadir como amigo
            </button>
          )
        )}
      </div>
  );
}  

function Posts({ usuario }) {
  if (!usuario || !usuario.posts || usuario.posts.length === 0) {
    return (
      <div className="Posts">
        <h1>No hay posts</h1>
      </div>
    );
  }

  return (
    <div className="Posts">
      {usuario.posts.map(post => (
        <div key={post._id} className="Post">
          <img src={`http://64.23.228.143:3001/${post.imageUrl}`} alt="Post Image" />
        </div>
      ))}
    </div>
  );
}

function VistaUsuario() {
  const { doRequest } = useApi();
  const { idUsuario } = useParams();
  const { user: miId } = useContext(AuthContext);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFriend, setFriendStatus] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await doRequest(`user/profile/${idUsuario}`, "GET", null, true);
      const usuarioNuevo = response.data;
      setUsuario(usuarioNuevo);
      setFriendStatus(usuarioNuevo.user.friends.some(friend => friend._id === miId._id));
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [idUsuario]);

  const user = JSON.parse(localStorage.getItem("user"));
  const myProfile = user && usuario && user._id === usuario.user._id;

  return (
    loading ? (
      <div>Cargando...</div>
    ) : (
      <div className="container">
        <div className="DatosUsuario">
          <FotoPerfil usuario={usuario} />
          <DatosUsuario
            usuario={usuario}
            myProfile={myProfile}
            isFriend={isFriend}
            setFriendStatus={setFriendStatus}
            fetchUser={fetchUser} // Pasamos fetchUser como prop
          />
        </div>
        <Posts usuario={usuario} />
      </div>
    )
  );
}



export default VistaUsuario;

