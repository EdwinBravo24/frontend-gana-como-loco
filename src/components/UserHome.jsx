import React, { useState, useEffect } from "react";
import axios from "axios";

const UserHome = () => {
  const [archivos, setArchivos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [archivo, setArchivo] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const obtenerArchivos = async () => {
      try {
        const { data } = await axios.get("https://backend-gana-como-loco.vercel.app/v1/archivos/muro", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArchivos(data.archivos);
      } catch (error) {
        console.error("Error al obtener los archivos:", error.response?.data);
      }
    };
    obtenerArchivos();
  }, [token]);

  const handleSubirArchivo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("titulo", titulo);

    try {
      const response = await axios.post(
        "https://backend-gana-como-loco.vercel.app/v1/archivos/subir",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Archivo subido exitosamente");
        setArchivo(null);
        setTitulo("");
        window.location.reload();
      } else {
        console.warn("Respuesta inesperada:", response);
        alert("Hubo un problema con la subida.");
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      alert("Hubo un error al subir el archivo.");
    }
  };

  const renderArchivo = (archivo) => {
    const ext = archivo.nombreOriginal.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      return <img src={archivo.url} alt={archivo.nombreOriginal} style={{ maxWidth: "300px", maxHeight: "300px" }} />;
    }

    if (["mp4", "webm", "ogg"].includes(ext)) {
      return (
        <video width="300" height="300" controls>
          <source src={archivo.url} type={`video/${ext}`} />
          Tu navegador no soporta el elemento de video.
        </video>
      );
    }

    if (["mp3", "wav", "ogg"].includes(ext)) {
      return (
        <audio controls>
          <source src={archivo.url} type={`audio/${ext}`} />
          Tu navegador no soporta el elemento de audio.
        </audio>
      );
    }

    return (
      <a href={archivo.url} target="_blank" rel="noopener noreferrer">
        Ver archivo: {archivo.nombreOriginal}
      </a>
    );
  };

  return (
    <div>
      <h1>Mi Muro</h1>
      <form onSubmit={handleSubirArchivo}>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
          required
        />
        <input type="file" onChange={(e) => setArchivo(e.target.files[0])} required />
        <button type="submit">Subir Archivo</button>
      </form>
      <div className="galeria">
        {archivos.length > 0 ? (
          archivos.map((archivo) => (
            <div key={archivo._id} className="archivo-item">
              <h3>{archivo.titulo}</h3>
              {renderArchivo(archivo)}
              <button onClick={() => eliminarArchivo(archivo._id)}>Eliminar</button>
            </div>
          ))
        ) : (
          <p>No hay archivos subidos aún.</p>
        )}
      </div>
    </div>
  );
};

const eliminarArchivo = async (id) => {
  const token = localStorage.getItem("token");
  if (window.confirm("¿Seguro que quieres eliminar este archivo?")) {
    try {
      await axios.delete(`https://backend-gana-como-loco.vercel.app/v1/archivos/eliminar/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Archivo eliminado correctamente");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar archivo:", error.response?.data);
    }
  }
};

export default UserHome;
