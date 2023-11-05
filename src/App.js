// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/sidebar/Sidebar.css'; // Make sure to import the CSS file

const App = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </nav>
  
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 main-content">
            <h1>Hello World</h1>
            {/* Content goes here */}
        </main>
        </div>
      </div>
    );
  };
  
  export default App;