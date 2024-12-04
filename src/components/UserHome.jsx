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
        const { data } = await axios.get("https://backend-gana-como-loco.vercel.app/muro", {
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
      await axios.post("https://backend-gana-como-loco.vercel.app/v1/archivos/subir", formData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true // Añadido para CORS
      });
      alert("Archivo subido exitosamente");
      setArchivo(null);
      setTitulo("");
      window.location.reload();
    } catch (error) {
      console.error("Error al subir el archivo:", error.response?.data);
    }
  };

  const renderArchivo = (archivo) => {
    const ext = archivo.nombreOriginal.split(".").pop().toLowerCase();

    // Si el archivo es una imagen, lo mostramos con <img>
    if (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "gif") {
      return <img src={archivo.url} alt={archivo.nombreOriginal} style={{ maxWidth: "300px", maxHeight: "300px" }} />;
    }

    // Si el archivo es un video, lo mostramos con <video>
    if (ext === "mp4" || ext === "webm" || ext === "ogg") {
      return (
        <video width="300" height="300" controls>
          <source src={archivo.url} type={`video/${ext}`} />
          Tu navegador no soporta el elemento de video.
        </video>
      );
    }

    // Si el archivo es un audio, lo mostramos con <audio>
    if (ext === "mp3" || ext === "wav" || ext === "ogg") {
      return (
        <audio controls>
          <source src={archivo.url} type={`audio/${ext}`} />
          Tu navegador no soporta el elemento de audio.
        </audio>
      );
    }

    // Otros tipos de archivo: mostramos solo el enlace
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

// Función para eliminar archivos
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
