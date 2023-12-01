import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/sidebar/Sidebar';
import Register from './components/users/Register';
import useAuth from './services/useAuth';
import Login from './components/users/Login';
import Profile from './components/users/Profile';
import AdminHome from './components/homepage/AdminHome';
import VendorHome from './components/homepage/VendorHome';

const App = () => {
  const isAuthenticated = useAuth();

  // Logic to determine user role (placeholder)
  const userRole = 'admin'; // This should be dynamically determined

  const renderHomePage = () => {
    switch (userRole) {
      case 'admin':
        return <AdminHome />;
      case 'vendor':
        return <VendorHome />;
      default:
        return <h1>Safe Ship Moving Services</h1>;
    }
  };

  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 main-content">
            <Routes>
              <Route path="/" element={isAuthenticated() ? renderHomePage() : <Navigate to="/login" />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;