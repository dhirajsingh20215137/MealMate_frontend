import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Button, ButtonGroup } from '@mui/material';
import { useAuth } from "../../auth/authContext";
import axios from 'axios';
import "../../index.css";

const HOST = "http://localhost:8081/";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const NutritionStats = () => {
  const { user, token } = useAuth();
  const [selectedType, setSelectedType] = useState('carbs');
  const [stats, setStats] = useState(null);
  const chartRef = useRef(null);

  const fetchStats = async (type) => {
    console.log('Fetching stats for:', type);
    try {
      const response = await axios.get(`${HOST}user/${user.userId}/stats/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(response.data);
      console.log('Stats1:', response.data);
      console.log('Stats2:', stats);
    } 
    catch (error) {
      console.error('Error fetching stats:', error);
    }

    console.log('Stats3:', stats);
  };

  useEffect(() => {
    if (user) fetchStats(selectedType);
  }, [selectedType, user]);

  useEffect(() => {
    return () => {
      if (chartRef.current && chartRef.current.destroy) {
        chartRef.current.destroy();
      }
    };
  }, [selectedType]);

  const chartData = stats
    ? {
        labels: ['Daily', 'Weekly', 'Monthly'],
        datasets: [
          {
            label: 'Target',
            data: [stats.dailyTarget, stats.weeklyTarget, stats.monthlyTarget],
            backgroundColor: '#1F5756',
            barThickness: 30, 
          },
          {
            label: 'Achieved',
            data: [stats.dailyAchieved, stats.weeklyAchieved, stats.monthlyAchieved],
            backgroundColor: '#FF6B6B',
            barThickness: 30, 
          },
        ],
      }
    : { labels: [], datasets: [] };

  return (
    <div className="p-6 w-full mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-screen-2xl mx-auto"> {/* Increased width */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Nutrition Analysis</h1>

        <ButtonGroup variant="outlined" fullWidth sx={{ marginBottom: '20px' }}>
          {['carbs', 'calories', 'proteins'].map((type) => (
            <Button
              key={type}
              onClick={() => setSelectedType(type)}
              sx={{
                backgroundColor: selectedType === type ? '#1F5756' : '#f9f9f9',
                color: selectedType === type ? '#fff' : '#000',
                border: '1px solid #1F5756',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#144442',
                  color: '#fff',
                },
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </ButtonGroup>

        <div className="mt-6 h-[500px] w-full">
          {stats ? (
            <Bar
              ref={chartRef}
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    backgroundColor: '#333',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    cornerRadius: 6,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 10000,
                      maxTicksLimit: 6,
                      color: '#555',
                      font: { size: 12, weight: 'bold' },
                      callback: (value) => value / 1000 + 'k',
                    },
                    grid: { color: '#E0E0E0', borderDash: [4, 4] },
                  },
                  x: {
                    ticks: { color: '#555', font: { size: 12, weight: 'bold' } },
                    grid: { display: false },
                    categoryPercentage: 0.5,
                    barPercentage: 0.8,
                  },
                },
                layout: {
                  padding: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,
                  },
                },
              }}
            />
          ) : (
            <p className="text-center text-gray-500">Select a nutrient to view statistics.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionStats;