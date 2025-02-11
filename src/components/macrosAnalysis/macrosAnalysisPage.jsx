import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Button, ButtonGroup } from '@mui/material';
import { useAuth } from "../../auth/authContext";
import axios from 'axios';
import "../../index.css";

const HOST = "http://localhost:8081/";

// ✅ Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const NutritionStats = () => {
  const { user, token } = useAuth();
  const [selectedType, setSelectedType] = useState('');
  const [stats, setStats] = useState(null);
  const chartRef = useRef(null); // ✅ Reference for cleanup

  const fetchStats = async (type) => {
    try {
      const response = await axios.get(`${HOST}user/${user.userId}/stats/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // ✅ Fetch stats when selectedType or user changes
  useEffect(() => {
    if (user) fetchStats(selectedType);
  }, [selectedType, user]);

  // ✅ Cleanup previous chart instances
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
            barThickness: 50,
          },
          {
            label: 'Achieved',
            data: [stats.dailyAchieved, stats.weeklyAchieved, stats.monthlyAchieved],
            backgroundColor: '#FF6B6B',
            barThickness: 50,
          },
        ],
      }
    : { labels: [], datasets: [] };

  return (
    <div className="p-6 w-11/12 mx-auto"> {/* ✅ Increased Width */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full"> {/* ✅ Full-width card */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Nutrition Analysis</h1>

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

        <div className="mt-6" style={{ width: '100%', height: '400px' }}> {/* ✅ Full-width Chart */}
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
                      stepSize: 100,
                      maxTicksLimit: 6,
                      color: '#555',
                      font: {
                        size: 14,
                        weight: 'bold',
                      },
                    },
                    grid: {
                      color: '#E0E0E0',
                      borderDash: [4, 4],
                    },
                  },
                  x: {
                    ticks: {
                      color: '#555',
                      font: {
                        size: 14,
                        weight: 'bold',
                      },
                    },
                    grid: {
                      display: false,
                    },
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