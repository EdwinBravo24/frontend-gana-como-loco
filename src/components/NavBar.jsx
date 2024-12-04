import React from 'react';
import { Link } from 'react-router-dom';
import './styles/NavBar.css';

const NavBar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {user && (
          <>
            <li className="navbar-item">
              <Link to="/userHome" className="navbar-link">
                Mi Muro
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/adminHome" className="navbar-link">
                Muro General
              </Link>
            </li>
            <li className="navbar-item">
              <button onClick={onLogout} className="navbar-button">
                Cerrar Sesión
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
