import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'; // Adjust the path as necessary

const Sidebar = () => {
    // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('userToken') !== null;

  const handleLogout = () => {
    // Logic to handle logout
    localStorage.removeItem('userToken');
    // Redirect to home page
    navigate('/');
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
          {isLoggedIn ? (
              <Link className="nav-link" to="/" onClick={handleLogout}>
                Logout
              </Link>
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