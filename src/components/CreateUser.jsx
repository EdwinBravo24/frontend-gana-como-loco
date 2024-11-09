// create user
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CreateUser.css';

function CreateUser() {
    const [formData, setFormData] = useState({
        nombre: '',
        cedula: '',
        telefono: '',
        ciudad: '',
        fechaDeNacimiento: '',
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
            const response = await fetch('http://localhost:4000/v1/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Usuario registrado exitosamente');
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
        <form onSubmit={handleSubmit} className="create-user-form">
            <h1>Crear Usuario</h1>

            <label>Nombre Completo</label>
            <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
            />

            <label>Cédula</label>
            <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleInputChange}
                required
            />

            <label>Teléfono</label>
            <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                required
            />

            <label>Ciudad</label>
            <input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleInputChange}
                required
            />

            <label>Fecha de Nacimiento</label>
            <input
                type="date"
                name="fechaDeNacimiento"
                value={formData.fechaDeNacimiento}
                onChange={handleInputChange}
                required
            />

            <label>Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
            />

            <label>Password</label>
            <input
                type="password"
                name="pass"
                value={formData.pass}
                onChange={handleInputChange}
                required
            />

            <button type="submit">Crear Cuenta</button>
            <button type="button" onClick={() => navigate('/')}>Cancelar</button>
        </form>
    );
}

export default CreateUser;
