import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminHome = () => {
  const [archivos, setArchivos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const obtenerArchivosGenerales = async () => {
      if (!token) {
        console.error("Token no encontrado.");
        return;
      }
  
      try {
        const { data } = await axios.get("https://backend-noutube.vercel.app/v1/archivos/general", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Archivos obtenidos:", data.archivos);
        setArchivos(data.archivos || []);
      } catch (error) {
        console.error("Error al obtener los archivos generales:", error.response?.data || error.message);
      }
    };
  
    obtenerArchivosGenerales();
  }, [token]);
  
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
      <h1>Muro General</h1>
      <div className="galeria">
        {archivos.length > 0 ? (
          archivos.map((archivo) => (
            <div key={archivo._id} className="archivo-item">
              <h3>{archivo.titulo}</h3>
              <p>{archivo.usuario?.nombre || "Desconocido"}</p>
              {renderArchivo(archivo)}
            </div>
          ))
        ) : (
          <p>No hay archivos subidos aún.</p>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
