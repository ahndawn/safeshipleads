import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './AdminHome.css';

const AdminHome = () => {
  const headers = {
    'X-API-KEY': 'test_api_key',
  };

  const [exclusiveLabelsData, setExclusiveLabelsData] = useState([]);
  const [sharedLabelsData, setSharedLabelsData] = useState([]);
  const [exclusiveGronatData, setExclusiveGronatData] = useState([]);
  const [sharedGronatData, setSharedGronatData] = useState([]);

  useEffect(() => {
    // Fetch data for labels chart
    fetch('http://localhost:5000/api/leads_by_label', { headers })
    // fetch('http://lead-nav.herokuapp.com/api/leads_by_gronat', { headers })
      .then(response => response.json())
      .then(data => {
        setExclusiveLabelsData(data.exclusive_leads);
        setSharedLabelsData(data.shared_leads);
      });

    // Fetch data for sent_to_gronat chart
    fetch('http://localhost:5000/api/leads_by_gronat', { headers })
    // fetch('http://lead-nav.herokuapp.com/api/leads_by_gronat', { headers })
      .then(response => response.json())
      .then(data => {
        setExclusiveGronatData(data.exclusive_leads);
        setSharedGronatData(data.shared_leads);
      });
  }, []);

  // Function to generate random colors
  const generateRandomColor = () => {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
  }

  // Prepare chart data
  const prepareChartData = (data) => ({
    labels: data.map(item => item.label || item.sent_to_gronat),
    datasets: [{
      data: data.map(item => item.count),
      backgroundColor: data.map(() => generateRandomColor()),
      borderColor: data.map(() => generateRandomColor()),
      borderWidth: 1
    }]
  });

  const exclusiveLabelsChartData = prepareChartData(exclusiveLabelsData);
  const sharedLabelsChartData = prepareChartData(sharedLabelsData);
  const exclusiveGronatChartData = prepareChartData(exclusiveGronatData);
  const sharedGronatChartData = prepareChartData(sharedGronatData);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard. Here you can manage the application settings, users, and more.</p>
      
      <div className="chart-group">
        <div className="chart-container">
          <h2>Exclusive Leads by Label</h2>
          <Pie data={exclusiveLabelsChartData} />
        </div>

        <div className="chart-container">
          <h2>Exclusive Leads by Gronat Status</h2>
          <Bar data={exclusiveGronatChartData} />
        </div>
      </div>

      <div className="chart-group">
        <div className="chart-container">
          <h2>Shared Leads by Label</h2>
          <Pie data={sharedLabelsChartData} />
        </div>

        <div className="chart-container">
          <h2>Shared Leads by Gronat Status</h2>
          <Bar data={sharedGronatChartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;