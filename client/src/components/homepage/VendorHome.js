import React, { useState, useEffect, useContext } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './VendorHome.css';
import { AuthContext } from '../../services/AuthContext';

const VendorHome = () => {
  const { user } = useContext(AuthContext);
  const [vendorLeadsData, setVendorLeadsData] = useState([]);

  useEffect(() => {
    const fetchVendorLeads = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/vendors/leads`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const data = await response.json();
        setVendorLeadsData(data);
      } catch (error) {
        console.error('Error fetching vendor leads:', error);
      }
    };

    fetchVendorLeads();
  }, [user.token]);

  // Function to render the leads table
  const renderTable = (data) => (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Vendor</th>
          <th>Name</th>
          <th>Origin Zip</th>
          <th>Destination Zip</th>
          <th>Move Size</th>
          <th>Move Date</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.timestamp}</td>
            <td>{item.label}</td>
            <td>{item.firstname}</td>
            <td>{item.ozip}</td>
            <td>{item.dzip}</td>
            <td>{item.movesize}</td>
            <td>{item.movedte}</td>
            <td>{item.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // You can add chart rendering logic similar to AdminHome.js if needed

  return (
    <div className="vendor-dashboard-wrapper">
      <div className="vendor-dashboard">
        <h2>Vendor Leads</h2>
        <div className="tables-container">
          {renderTable(vendorLeadsData)}
        </div>
      </div>
    </div>
  );
};

export default VendorHome;