// create admin
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CreateAdmin.css';

function CreateAdmin() {
    const [formData, setFormData] = useState({
        email: '',
        pass: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://backend-gana-como-loco.vercel.app/v1/users/registerAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Administrador registrado exitosamente');
                navigate('/');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en el registro');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1>Crear Administrador</h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />

                <input
                    type="password"
                    name="pass"
                    placeholder="Contraseña"
                    value={formData.pass}
                    onChange={handleInputChange}
                    required
                />

                <button type="submit">Crear Administrador</button>
                <button type="button" onClick={() => navigate('/')}>
                    Volver a Inicio
                </button>
            </form>
        </div>
    );
}

export default CreateAdmin;
