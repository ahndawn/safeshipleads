import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { AuthContext } from './../../services/AuthContext'; // Adjust the path as necessary

const Sidebar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, updateAuth } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('user');
    updateAuth(false);
    navigate('/login');
  };

  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            {isAuthenticated ? (
              <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;