import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/sidebar/Sidebar'; // Import the Sidebar component
import Register from './components/users/Register';
import Login from './components/users/Login';
import Profile from './components/users/Profile';
import AdminHome from './components/homepage/AdminHome'; // Import AdminHome
import VendorHome from './components/homepage/VendorHome'; // Import VendorHome

const App = () => {
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
          <Sidebar /> {/* Use the Sidebar component */}
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 main-content">
            <Routes>
              <Route path="/" element={renderHomePage()} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
