import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const NutritionChart = ({ stats }) => {
  const chartData = stats
    ? {
        labels: ['Daily', 'Weekly', 'Monthly'],
        datasets: [
          {
            label: 'Target',
            data: [stats.dailyTarget, stats.weeklyTarget, stats.monthlyTarget],
            backgroundColor: '#1F5756',
            borderRadius: 4,
          },
          {
            label: 'Achieved',
            data: [stats.dailyAchieved, stats.weeklyAchieved, stats.monthlyAchieved],
            backgroundColor: '#FF6B6B',
            borderRadius: 4,
          },
        ],
      }
    : { labels: [], datasets: [] };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
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
          callback: (value) => `${value / 1000}k`,
        },
        grid: { color: '#E0E0E0', borderDash: [4, 4] },
      },
      x: {
        ticks: { color: '#555', font: { size: 12, weight: 'bold' } },
        grid: { display: false },
        categoryPercentage: 0.6,
        barPercentage: 0.8,
      },
    },
    layout: {
      padding: { left: 20, right: 20, top: 20, bottom: 20 },
    },
  };

  return (
    <div className="mt-6 h-[500px] w-full">
      {stats ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p className="text-center text-gray-500">Select a nutrient to view statistics.</p>
      )}
    </div>
  );
};

export default NutritionChart;
