import React, { useState, useEffect } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2'; // Import Line component
import Chart from 'chart.js/auto';
import './AdminHome.css';

const AdminHome = () => {
  const headers = {
    'X-API-KEY': 'test_api_key',
  };

  const [todaysExclusiveLeadsData, setTodaysExclusiveLeadsData] = useState([]);
  const [todaysSharedLeadsData, setTodaysSharedLeadsData] = useState([]);
  const [exclusiveLabelsData, setExclusiveLabelsData] = useState([]);
  const [sharedLabelsData, setSharedLabelsData] = useState([]);
  const [exclusiveGronatData, setExclusiveGronatData] = useState([]);
  const [sharedGronatData, setSharedGronatData] = useState([]);

  useEffect(() => {
    // Fetch data for today's leads by label
    fetch('http://localhost:5000/api/todays_exclusive_leads_by_label', { headers })
      .then(response => response.json())
      .then(data => setTodaysExclusiveLeadsData(data));

    fetch('http://localhost:5000/api/todays_shared_leads_by_label', { headers })
      .then(response => response.json())
      .then(data => setTodaysSharedLeadsData(data));

    // Fetch data for exclusive and shared leads
    fetch('http://localhost:5000/api/leads_by_label', { headers })
      .then(response => response.json())
      .then(data => {
        setExclusiveLabelsData(data.exclusive_leads);
        setSharedLabelsData(data.shared_leads);
      });

    fetch('http://localhost:5000/api/leads_by_gronat', { headers })
      .then(response => response.json())
      .then(data => {
        setExclusiveGronatData(data.exclusive_leads);
        setSharedGronatData(data.shared_leads);
      });
  }, []);

  // Function to generate paler random colors
  const generateRandomColor = () => {
    const mix = [255, 255, 255]; // Color to mix (white)
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    // Mix the color
    red = Math.floor((red + mix[0]) / 2);
    green = Math.floor((green + mix[1]) / 2);
    blue = Math.floor((blue + mix[2]) / 2);

    const rgb = `rgb(${red}, ${green}, ${blue})`;
    return rgb;
  }

  // Prepare chart data
  const prepareChartData = (data) => ({
    labels: data.map(item => item.label || item.sent_to_gronat),
    datasets: [{
      data: data.map(item => item.count),
      backgroundColor: data.map(() => generateRandomColor()),
      borderColor: 'transparent',
      borderWidth: .1
    }]
  });

  const prepareLineChartData = (data, label, color) => ({
    labels: data.map(item => item.label),
    datasets: [{
      label: label,
      data: data.map(item => item.count),
      backgroundColor: color,
      borderColor: color,
      borderWidth: 2,
      fill: false
    }]
  });

  const exclusiveLeadsLineChartData = prepareLineChartData(todaysExclusiveLeadsData, 'Exclusive Leads', 'rgba(54, 162, 235, 0.5)');
  const sharedLeadsLineChartData = prepareLineChartData(todaysSharedLeadsData, 'Shared Leads', 'rgba(255, 99, 132, 0.5)');
  const exclusiveLabelsChartData = prepareChartData(exclusiveLabelsData);
  const sharedLabelsChartData = prepareChartData(sharedLabelsData);
  const exclusiveGronatChartData = prepareChartData(exclusiveGronatData);
  const sharedGronatChartData = prepareChartData(sharedGronatData);

      // Chart options for displaying labels inside the chart
      const chartOptions = {
        plugins: {
          legend: {
            display: false // Set to false to hide the legend
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y;
                }
                return label;
              }
            }
          }
        }
      };

      return (
        <div className="admin-dashboard">
          <h1>Admin Dashboard</h1>
          <p>Welcome to the Admin Dashboard. Here you can manage the application settings, users, and more.</p>

      <div className="line-charts-container">
        <div className="chart-container">
          <h2>Today's Exclusive Leads</h2>
          <Line data={exclusiveLeadsLineChartData} options={chartOptions} />
        </div>

        <div className="chart-container">
          <h2>Today's Shared Leads</h2>
          <Line data={sharedLeadsLineChartData} options={chartOptions} />
        </div>
      </div>
          
          <div className="chart-group">
            <div className="chart-container">
              <h2>Exclusive Leads by Label</h2>
              <Pie data={exclusiveLabelsChartData} options={chartOptions} />
            </div>
    
            <div className="chart-container">
              <h2>Exclusive Leads by Gronat Status</h2>
              <Bar data={exclusiveGronatChartData} options={chartOptions} />
            </div>
          </div>
    
          <div className="chart-group">
            <div className="chart-container">
              <h2>Shared Leads by Label</h2>
              <Pie data={sharedLabelsChartData} options={chartOptions} />
            </div>
    
            <div className="chart-container">
              <h2>Shared Leads by Gronat Status</h2>
              <Bar data={sharedGronatChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      );
    };

export default AdminHome;