import React, { useState, useEffect } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2'; // Import Line component
import Chart from 'chart.js/auto';
import './AdminHome.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import arrow icons

const AdminHome = () => {
  const headers = {
    'X-API-KEY': 'test_api_key',
  };

  const [currentChart, setCurrentChart] = useState('exclusive');
  
  // Function to get today's date in a readable format
  const todaysDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Declare state and setter functions for all your data
  const [todaysExclusiveLeadsData, setTodaysExclusiveLeadsData] = useState([]);
  const [todaysSharedLeadsData, setTodaysSharedLeadsData] = useState([]);
  const [exclusiveLabelsData, setExclusiveLabelsData] = useState([]);
  const [sharedLabelsData, setSharedLabelsData] = useState([]);
  const [exclusiveGronatData, setExclusiveGronatData] = useState([]); // Add this line
  const [sharedGronatData, setSharedGronatData] = useState([]); // Add this line
  const [combinedLeadsData, setCombinedLeadsData] = useState([]);
  const [currentLeadsData, setCurrentLeadsData] = useState([]); 
  const [isExclusive, setIsExclusive] = useState(true);// New state hook for combined data


  useEffect(() => {
    // Fetch data for today's leads by label and combined leads data
    const fetchData = async () => {
      const exclusiveResponse = await fetch('http://localhost:5000/api/todays_exclusive_leads_by_label', { headers });
      const exclusiveData = await exclusiveResponse.json();
      setTodaysExclusiveLeadsData(exclusiveData);

      const sharedResponse = await fetch('http://localhost:5000/api/todays_shared_leads_by_label', { headers });
      const sharedData = await sharedResponse.json();
      setTodaysSharedLeadsData(sharedData);

      const leadsResponse = await fetch(`http://localhost:5000/api/todays_leads_data?lead_type=${currentChart}`, { headers });
    const leadsData = await leadsResponse.json();
    setCurrentLeadsData(leadsData.leadsData);
    };

    fetchData();
  }, [currentChart]);

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
  

    // Prepare chart data
    const preparePieChartData = (data) => ({
      labels: data.map(item => item.label),
      datasets: [{
        data: data.map(item => item.count),
        backgroundColor: data.map(() => generateRandomColor()),
        borderColor: 'transparent',
        borderWidth: 1
      }]
    });

  
    const handleNext = () => {
      const newChart = currentChart === 'exclusive' ? 'shared' : 'exclusive';
      setCurrentChart(newChart);
      setCurrentLeadsData(newChart === 'exclusive' ? todaysExclusiveLeadsData : todaysSharedLeadsData);
  };

  const handlePrev = () => {
    const newChart = currentChart === 'exclusive' ? 'shared' : 'exclusive';
    setCurrentChart(newChart);
    setCurrentLeadsData(newChart === 'exclusive' ? todaysExclusiveLeadsData : todaysSharedLeadsData);
};

const toggleLeadsData = () => {
  setIsExclusive(!isExclusive); // Toggle between exclusive and shared leads
  setCurrentChart(isExclusive ? 'shared' : 'exclusive');
  setCurrentLeadsData(isExclusive ? todaysSharedLeadsData : todaysExclusiveLeadsData);
};

  const exclusiveLeadsLineChartData = prepareLineChartData(todaysExclusiveLeadsData, 'Exclusive Leads', 'rgba(54, 162, 235, 0.5)');
  const sharedLeadsLineChartData = prepareLineChartData(todaysSharedLeadsData, 'Shared Leads', 'rgba(255, 99, 132, 0.5)');
  const exclusiveLeadsPieChartData = preparePieChartData(todaysExclusiveLeadsData);
  const sharedLeadsPieChartData = preparePieChartData(todaysSharedLeadsData);

      // Chart options for displaying labels inside the chart
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                // Ensure that label and value are correctly referenced
                const label = context.label || '';
                const value = context.raw; // Use 'raw' to get the actual value
                return `${label}: ${value}`;
              }
            }
          }
        }
      };

      return (
        <div className="admin-dashboard-wrapper">
          <div className="admin-dashboard">
          <h2>{isExclusive ? "Exclusive" : "Shared"} Leads for {todaysDate()}</h2>
    
          <div className="charts-carousel">
          {isExclusive && (
            <button onClick={toggleLeadsData} className="carousel-control right">
              <FaArrowRight />
              <span className="button-label">Shared</span>
            </button>
          )}
          {!isExclusive && (
            <button onClick={toggleLeadsData} className="carousel-control left">
              <FaArrowLeft />
              <span className="button-label">Exclusive</span>
            </button>
          )}
    
              <div className="charts-container">
                {currentChart === 'exclusive' ? (
                  <>
                    <div className="chart-container">
                      <Line data={exclusiveLeadsLineChartData} options={chartOptions} />
                    </div>
                    <div className="pie-chart-container">
                      <Pie data={exclusiveLeadsPieChartData} options={chartOptions} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="chart-container">
                      <Line data={sharedLeadsLineChartData} options={chartOptions} />
                    </div>
                    <div className="pie-chart-container">
                      <Pie data={sharedLeadsPieChartData} options={chartOptions} />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="tables-container">
            {renderTable(currentLeadsData)}
            </div>
          </div>
        </div>
      );
    };

export default AdminHome;