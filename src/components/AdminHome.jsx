import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import './styles/AdminHome.css';

function AdminHome() {
    const [winners, setWinners] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
        return <Navigate to="/" />;
    }

    useEffect(() => {
        fetchWinners();
    }, []);

    const fetchWinners = async () => {
        try {
            const response = await fetch('https://backend-gana-como-loco.vercel.app/v1/intentos/usuario', {
                headers: {
                    'Authorization': `Bearer ${token}` // Token para autenticar
                }
            });

            if (response.ok) {
                const data = await response.json();
                setWinners(data);
                setError(null); // Resetear error si la llamada es exitosa
            } else {
                throw new Error('No se pudo obtener los ganadores');
            }
        } catch (error) {
            console.error('Error al obtener ganadores:', error);
            setError(error.message); // Guardar mensaje de error
        }
    };

    return (
        <div>
            <h1>vista de Administrador</h1>
            <h2>Lista de Ganadores</h2>

            {error && <p className="error">{error}</p>} {/* Mostrar mensaje de error si existe */}

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cédula</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Ciudad</th> {/* Nueva columna para la ciudad */}
                        <th>Código</th>
                        <th>Fecha de Registro</th>
                        <th>Premio</th>
                    </tr>
                </thead>
                <tbody>
                    {winners.length > 0 ? (
                        winners.map((winner, index) => (
                            <tr key={winner.usuario._id}>
                                <td>{winner.usuario.nombre}</td>
                                <td>{winner.usuario.cedula || 'N/A'}</td>
                                <td>{winner.usuario.telefono || 'N/A'}</td>
                                <td>{winner.usuario.email}</td>
                                <td>{winner.usuario.ciudad || 'N/A'}</td> {/* Mostrar ciudad */}
                                <td>{winner.codigo}</td>
                                <td>{new Date(winner.fecha).toLocaleString()}</td>
                                <td>{winner.premio}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No hay ganadores registrados.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button onClick={fetchWinners}>Actualizar datos</button>

            <button onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('role'); // Elimina el rol al cerrar sesión
                navigate('/');
            }}>Cerrar Sesión</button>
        </div>
    );
}

export default AdminHome;
