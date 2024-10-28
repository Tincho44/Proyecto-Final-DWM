import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { AuthContext } from '../../../shared/context/AuthContext';

function CambiarFoto({ usuario, onFotoUpdated }) {
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
            const response = await doRequest(`users/${usuario.id}/foto`, "PUT", formData, true);
            onFotoUpdated(response.data.fotoUrl);
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

function CambiarDescripcion({ usuario, onDescripcionUpdated }) {
    const { doRequest } = useApi();
    const [nuevaDescripcion, setNuevaDescripcion] = useState(usuario.descripcion);

    const handleTextChange = (event) => {
        setNuevaDescripcion(event.target.value);
    };

    const handleUpdate = async () => {
        try {
            await doRequest(`users/${usuario.id}/descripcion`, 'PUT', { descripcion: nuevaDescripcion }, true);
            onDescripcionUpdated(nuevaDescripcion);
            alert("Descripción actualizada con éxito.");
        } catch (error) {
            console.error("Error updating description:", error);
        }
    };

    return (
        <div>
            <input type="text" value={nuevaDescripcion} onChange={handleTextChange} />
            <button className="cambiarDescripcion" onClick={handleUpdate}>Cambiar</button>
        </div>
    );
}

function FotoPerfil({ usuario, onFotoUpdated }) {
    return (
        <div>
            <img src={usuario.fotoUrl} alt="Foto de perfil" />
            <CambiarFoto usuario={usuario} onFotoUpdated={onFotoUpdated} />
        </div>
    );
}

function DatosUsuario({ usuario, onDescripcionUpdated }) {
    return (
        <div>
            <h2>{usuario.nombre}</h2>
            <p>{usuario.descripcion}</p>
            <CambiarDescripcion usuario={usuario} onDescripcionUpdated={onDescripcionUpdated} />
        </div>
    );
}

function Posts() {

}

function VistaUsuario() {
    const { user } = useContext(AuthContext);
    const { doRequest } = useApi();
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    //Si el usuario soy yo la logica es sencilla, solo traerme del context mi user.
    //Si el usuario es otra persona hay que ver como implementar el tocar el perfil y que cargue ese user. 

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await doRequest(`profile/${IdUsuario}`, 'GET', null, true);
                setUsuario(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };
        fetchUser();
    }, [doRequest]);

    const handleFotoUpdated = (newFotoUrl) => {
        setUsuario((prevUsuario) => ({ ...prevUsuario, fotoUrl: newFotoUrl }));
    };

    const handleDescripcionUpdated = (newDescripcion) => {
        setUsuario((prevUsuario) => ({ ...prevUsuario, descripcion: newDescripcion }));
    };

    if (loading) return <p>Loading...</p>;
    if (!usuario) return <p>User not found</p>;

    return (
        <div className="container">
            <div className="DatosUsuario">
                <FotoPerfil usuario={usuario} onFotoUpdated={handleFotoUpdated} />
                <DatosUsuario usuario={usuario} onDescripcionUpdated={handleDescripcionUpdated} />
                <Posts />
            </div>
        </div>
    );
}

export default VistaUsuario;
