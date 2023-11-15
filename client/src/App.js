// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/sidebar/Sidebar.css'; // Make sure to import the CSS file
import Register from './components/users/Register'; // Import the Register component
import Login from './components/users/Login'; // Import the Login component
import Profile from './components/users/Profile'; // Import the Profile component

const App = () => {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/services">
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 main-content">
            <Routes>
            <Route path="/" element={<h1>Safe Ship Moving Services</h1>} />
              <Route path="/services">
                {/* Services content goes here */}
              </Route>
              <Route path="/about">
                {/* About content goes here */}
              </Route>
              <Route path="/contact">
                {/* Contact content goes here */}
              </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              {/* Add other routes here */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;