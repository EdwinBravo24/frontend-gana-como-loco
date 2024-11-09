// vista para ingresar los codigos.
// UserHome.jsx
// UserHome.jsx

import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import './styles/UserHome.css';

function UserHome() {
    const [code, setCode] = useState('');
    const [registeredCodes, setRegisteredCodes] = useState([]);
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    // Redirige si no hay token o el rol no es 'user'
    if (!token || role !== 'user') {
        return <Navigate to="/" />;
    }

    useEffect(() => {
        fetchRegisteredCodes();
    }, []);

    const fetchRegisteredCodes = async () => {
        try {
            const response = await fetch('https://backend-gana-como-loco.vercel.app/v1/codigos/registrados', {
                headers: {
                    'Authorization': `Bearer ${token}` // Asegúrate de que el token se esté pasando correctamente
                }
            });
            if (response.ok) {
                const data = await response.json();
                setRegisteredCodes(data); // Guarda los códigos obtenidos
            } else {
                console.error('Error al obtener códigos:', response.statusText);
                alert('No se han encontrado códigos registrados');
            }
        } catch (error) {
            console.error('Error al obtener códigos:', error);
            alert('Error al obtener los códigos registrados');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (code.length !== 2 || isNaN(code)) {
            alert('Por favor ingrese un código válido de dos dígitos');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/v1/codigos/ingresar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ codigo: code }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.mensaje);
                setCode('');
                fetchRegisteredCodes(); // Actualiza la lista de códigos después de registrar uno nuevo
            } else {
                alert(data.mensaje);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al procesar el código');
        }
    };

    return (
        <div>
            <h1>Panel de Usuario</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Ingrese código de 2 dígitos"
                    maxLength="2"
                    pattern="\d{2}"
                    required
                />
                <button type="submit">Registrar Código</button>
            </form>

            <h2>Códigos Registrados</h2>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Fecha de Registro</th>
                        <th>Premio</th>
                    </tr>
                </thead>
                <tbody>
                    {registeredCodes.length > 0 ? (
                        registeredCodes.map((registro, index) => (
                            <tr key={index}>
                                <td>{registro.codigo}</td>
                                <td>{new Date(registro.fechaRegistro).toLocaleString()}</td>
                                <td>{registro.premio}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No tienes códigos registrados.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button onClick={fetchRegisteredCodes}>Actualizar</button>

            <button onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                navigate('/');
            }}>Cerrar Sesión</button>
        </div>
    );
}

export default UserHome;
