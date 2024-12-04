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
        const { data } = await axios.get("https://backend-gana-como-loco.vercel.app/v1/archivos/general", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArchivos(data.archivos || []);
      } catch (error) {
        console.error("Error al obtener los archivos generales:", error.response?.data || error.message);
      }
    };

    obtenerArchivosGenerales();
  }, [token]);

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
