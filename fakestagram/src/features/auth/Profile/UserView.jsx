import React, { useState } from "react";

function CambiarFoto(Usuario) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("fotoPerfil", selectedFile);

            const token = localStorage.getItem('token');

            fetch(`/api/usuarios/${Usuario.id}/cambiarFoto`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log("Foto actualizada:", data);
            })
            .catch(error => {
                console.error("Error al cambiar la foto:", error);
            });
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Subir nueva foto</button>
        </div>
    );
}

function CambiarDescripcion(Usuario) {
    const [nuevaDescripcion, setNuevaDescripcion] = useState(Usuario.descripcion);

    const handleDescripcionChange = (event) => {
        setNuevaDescripcion(event.target.value);
    };

    const handleSubmit = () => {
        const token = localStorage.getItem('token');

        //Ahora mismo no tenemos claro la dir del back.

        fetch(`/api/usuarios/${Usuario.id}/cambiarDescripcion`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ descripcion: nuevaDescripcion }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Descripción actualizada:", data); 
        })
        .catch(error => {
            console.error("Error al cambiar la descripción:", error);
        });
    };

    return (
        <div>
            <textarea
                value={nuevaDescripcion}
                onChange={handleDescripcionChange}
                placeholder="Escribe tu nueva descripción"
            />
            <button onClick={handleSubmit}>Guardar Descripción</button>
        </div>
    );
}

function FotoPerfil({ Usuario }) {
    return (
        <div>
            <img src={Usuario.fotoUrl} alt="Foto de perfil" />
            <button className="cambiarFoto" onClick={() => CambiarFoto(Usuario)}>Cambiar</button>
        </div>
    );
}

function DatosUsuario({ Usuario }) {
    return (
        <div>
            <h2>{Usuario.nombre}</h2>
            <p>{Usuario.descripcion}</p>
            <button className="cambiarDescripcion" onClick={() => CambiarDescripcion(Usuario)}>
                Cambiar Descripción
            </button>
        </div>
    );
}
function ListaPosteos(){

}

function VistaUsuario({ IdUsuario }) {
    const usuario = {
        id: IdUsuario,
        nombre: "Martin Cabral",
        descripcion: "Desarrollador Frontend",
        fotoUrl: "", 
    };

    return (
        <div className="container">
            <div className="DatosUsuario">
                <FotoPerfil Usuario={usuario} />
                <DatosUsuario Usuario={usuario} />
                <ListaPosteos />
            </div>
        </div>
    );
}

export default VistaUsuario;
