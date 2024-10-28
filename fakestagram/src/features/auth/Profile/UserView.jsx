import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";

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
        await doRequest(`users/${usuario.id}/foto`, "PUT", formData, true);
        alert("Foto de perfil actualizada con éxito.");
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    };
  
    return (
      <div>
        <img src={usuario.fotoUrl} alt="Foto de perfil" />
        <input type="file" onChange={handleFileChange} />
        <button className="cambiarFoto" onClick={handleUpload}>Cambiar</button>
      </div>
    );
  }
  

function CambiarDescripcion(userId, newDescripcion) {
  const { doRequest } = useApi();
  const [nuevaDescripcion, setDescripcion] = useState(null);
  
    const handleTextChange = (event) => {
      setDescripcion(event.target.files[0]);
    };

  handleUpload = async () => {
    try {
      await doRequest(`users/${userId}/descripcion`, 'PUT', { descripcion: nuevaDescripcion }, true);
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };
  return (
    <div>
        <p>{usuario.descripcion}</p>
        <input type="text" onChange={handleTextChange} />
        <button className="cambiarDescripcion" onClick={handleUpload}>Cambiar</button>
      </div>
  )
}

function FotoPerfil({ usuario }) {
  const cambiarFoto = CambiarFoto(usuario);
  return (
    <div>
      <img src={usuario.fotoUrl} alt="Foto de perfil" />
      <button className="cambiarFoto" onClick={cambiarFoto}>Cambiar</button>
    </div>
  );
}

function DatosUsuario({ usuario }) {
  const cambiarDescripcion = CambiarDescripcion(usuario);

  return (
    <div>
      <h2>{usuario.nombre}</h2>
      <p>{usuario.descripcion}</p>
      <button className="cambiarDescripcion" onClick={cambiarDescripcion}>
        Cambiar Descripción
      </button>
    </div>
  );
}

function Posts() {

}

function VistaUsuario({ IdUsuario }) {
    const { user: currentUser } = useContext(AuthContext);
    const { doRequest } = useApi();
    const [usuario, setUsuario] = useState(null);

    const isOwner = usuario && currentUser && usuario.id === currentUser.id;


    if(!isOwner){
        useEffect(() => {
            const fetchUser = async () => {
                try {
                    const response = await doRequest(`profile/${IdUsuario}`, 'GET', null, true);
                    setUsuario(response.data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };
            fetchUser();
        }, [IdUsuario, doRequest]); 
    }

    return (
        <div className="container">
            <div className="DatosUsuario">
                <FotoPerfil usuario={usuario}/>
                <DatosUsuario usuario={usuario}/>
                <Posts />
            </div>
        </div>
    );
}

export default VistaUsuario; 