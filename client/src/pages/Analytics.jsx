import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Analytics() {
    const [ logs, setLogs ] = useState([])

    const getLogLevelData = (logs) => {
        const levels = logs.reduce((acc, log) => {
          acc[log.level] = (acc[log.level] || 0) + 1;
          return acc;
        }, {});
    
        return {
          labels: Object.keys(levels),
          datasets: [
            {
              data: Object.values(levels),
              backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
              hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            },
          ],
        };
      };
    
      // Group data by resourceId for Bar Chart
      const getResourceIdData = (logs) => {
        const resources = logs.reduce((acc, log) => {
          acc[log.resource_id] = (acc[log.resource_id] || 0) + 1;
          return acc;
        }, {});
    
        return {
          labels: Object.keys(resources),
          datasets: [
            {
              label: 'Resource ID Count',
              data: Object.values(resources),
              backgroundColor: ['#4BC0C0', '#FF6384', '#FFCE56'],
              borderColor: ['#4BC0C0', '#FF6384', '#FFCE56'],
              borderWidth: 1,
            },
          ],
        };
      };

      // Group data by spanId for Pie Chart
      const getSpanIdData = (logs) => {
        const spanIds = logs.reduce((acc, log) => {
          acc[log.span_id] = (acc[log.span_id] || 0) + 1;
          return acc;
        }, {});
    
        return {
          labels: Object.keys(spanIds),
          datasets: [
            {
              data: Object.values(spanIds),
              backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
              hoverBackgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
            },
          ],
        };
      };
    
      // Group data by commit for Bar Chart
      const getCommitData = (logs) => {
        const commits = logs.reduce((acc, log) => {
          acc[log.commit] = (acc[log.commit] || 0) + 1;
          return acc;
        }, {});
    
        return {
          labels: Object.keys(commits),
          datasets: [
            {
              label: 'Commit Count',
              data: Object.values(commits),
              backgroundColor: ['#4BC0C0', '#FF6384', '#FFCE56'],
              borderColor: ['#4BC0C0', '#FF6384', '#FFCE56'],
              borderWidth: 1,
            },
          ],
        };
      };
      
    useEffect(() => {
        const config = {
            method: "get",
            url: "http://localhost:5000/logs",
        }

        axios(config)
            .then((response) => {
                const logsData = response.data.map(log => log._source);
                console.log(logsData);
                setLogs(logsData);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);
      
    return (
        <div>
            <h2 className='text-xl'>Analytics Dashboard</h2>
            <div style={{ display: 'flex', justifyContent: 'start', flexWrap: 'wrap' }}>
                {/* Pie Chart for Log Levels */}
                <div style={{ width: '30%' }}>
                    <h3>Log Levels</h3>
                    {logs.length > 0 ? <Pie data={getLogLevelData(logs)} /> : <p>No log data available</p>}
                </div>

                {/* Pie Chart for Span IDs */}
                <div style={{ width: '30%' }}>
                    <h3>Span IDs</h3>
                    {logs.length > 0 ? <Pie data={getSpanIdData(logs)} /> : <p>No span ID data available</p>}
                </div>

                {/* Bar Chart for Commits */}
                <div style={{ width: '40%' }}>
                    <h3>Commits</h3>
                    {logs.length > 0 ? <Bar data={getCommitData(logs)} options={{ responsive: true, scales: { y: { beginAtZero: true } }}} /> : <p>No commit data available</p>}
                </div>
            </div>
        </div>
    );
}

export default Analytics
