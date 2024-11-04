import React, { useEffect, useState, useContext } from "react";
import useApi from "../../../shared/hooks/useApi";
import '../styles/Profile.css';

function CambiarFoto({ usuario }) {
  const { doRequest } = useApi();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("foto", selectedFile);

    try {
      await doRequest(`user/profile/edit`, "PUT", formData, true);
      alert("Foto de perfil actualizada con éxito.");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button className="cambiarFoto" onClick={handleUpload}>Cambiar</button>
    </div>
  );
}

function CambiarDescripcion({ userId }) {
  const { doRequest } = useApi();
  const [nuevaDescripcion, setDescripcion] = useState("");

  const handleTextChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleUpload = async () => {
    try {
      await doRequest(`user/profile/edit`, 'PUT', { descripcion: nuevaDescripcion }, true);
      alert("Descripción actualizada con éxito.");
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
  return (
    <div className="FotoPerfil">
    <h1>{usuario.user.username}</h1>
      <img src={usuario.profilePicture} alt="Foto de perfil" />
      {usuario && usuario.user ? ( 
        <p>{usuario.user.username}</p>
      ) : (
        <h2>Cargando...</h2> 
      )}
      <p>No tiene description el back</p>
    </div>
  );
}

//Aca tengo que chequear si el usuario soy yo mismo
function DatosUsuario({ usuario, myProfile }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { doRequest } = useApi();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddFriend = async () => {
    try {
      await doRequest(`/add-friend/${usuario._id}`, "POST", null, true);
      alert("Solicitud de amistad enviada.");
    } catch (error) {
      console.error("Error al añadir amigo:", error);
    }
  };
  
  const handleRemoveFriend = async () => {
    try {
      await doRequest(`/remove-friend/${usuario._id}`, "DELETE", null, true);
      alert("Amigo eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar amigo:", error);
    }
  };
  
  return (
    <div className="Datos">
      <div className="Friends">
        <p className="InformacionBasica">Amigos: {usuario.user.friends.length}</p>
        <p className="InformacionBasica">Posts: {usuario.posts.length}</p>
      </div>
      
      {myProfile ? (
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
        usuario.user.friends.includes(usuario._id) ? (
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
  //Añadir onClick
  return (
    <div className="Posts"> 
      {usuario.posts.map(post => (
        <div key={post._id} className="Post">
          <img src={post.imageUrl} />
        </div>
      ))}
    </div>
  );
}


function VistaUsuario({ idUsuario }) {
  const { doRequest } = useApi();
  const [usuario, setUsuario] = useState({ user: { username: '', profilePicture: '' }, _id: '', posts: null });


  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await doRequest(`user/profile/${idUsuario}`, 'GET', null, true);
      setUsuario(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchUser();
}, [idUsuario, doRequest]);

const user = JSON.parse(localStorage.getItem('user'));
let myProfile = false;
{usuario && usuario.user
if(user._id === usuario.user._id){
  myProfile = true;
}
}
return (
  loading ? (
    <div>Cargando...</div>
  ) : (
    <div className="container">
      <div className="DatosUsuario">
        <FotoPerfil usuario={usuario} />
        <DatosUsuario usuario={usuario} myProfile={myProfile}/>
      </div>
      <Posts usuario={usuario} />
    </div>
  )
);
}
export default VistaUsuario;
