import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch("https://backend-noutube.vercel.app/v1/users/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, pass }),
          });
      
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            navigate("/userHome");
            if (callback) callback(data.role);
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Error en la solicitud");
        }
      };
      
    return (
        <form onSubmit={validateUser}>
            <h1>Bienvenido a noutube crack ;-;</h1>
            <label>Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label>Password</label>
            <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
            />

            <button type="submit">Iniciar Sesión</button>
            <button type="button" onClick={() => navigate('/createUser')}>
                Registrarse
            </button>
        </form>
    );
}

export default Form;
