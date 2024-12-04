import './App.css';
import Form from './components/Form';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import CreateUser from './components/CreateUser';
import NavBar from './components/NavBar'; // Barra de navegación
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); // Simula que el usuario está autenticado si hay token
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <NavBar onLogout={handleLogout} user={user} />
      <Routes>
        <Route path="/" element={<Form callback={setUser} />} />
        {user ? (
          <>
            <Route path="/userHome" element={<UserHome />} />
            <Route path="/adminHome" element={<AdminHome />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        <Route path="/createUser" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;