import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ user, onLogout }) => {
  return (
    <nav style={{ background: '#2c3e50', padding: '10px' }}>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          justifyContent: 'space-around',
          margin: 0,
          padding: 0,
        }}
      >
        {user && (
          <>
            <li>
              <Link to="/userHome" style={{ color: 'white', textDecoration: 'none' }}>
                Mi Muro
              </Link>
            </li>
            <li>
              <Link to="/adminHome" style={{ color: 'white', textDecoration: 'none' }}>
                Muro General
              </Link>
            </li>
            <li>
              <button
                onClick={onLogout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
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
