import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { AuthContext } from './../../services/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, updateAuth } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const userString = localStorage.getItem('user');
      if (userString) {
        try {
          const user = JSON.parse(userString);
          setUserRole(user ? user.role : null);
        } catch (error) {
          console.error("Error parsing user data from localStorage", error);
        }
      }
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    updateAuth(false);
    setUserRole(null);
    navigate('/login');
  };

  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          {userRole === 'admin' && (
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                <i className="fas fa-user-plus"></i> Create User
              </Link>
            </li>
          )}
          <li className="nav-item">
            {isAuthenticated ? (
              <button className="nav-link btn btn-link" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            ) : (
              <Link className="nav-link" to="/login">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;