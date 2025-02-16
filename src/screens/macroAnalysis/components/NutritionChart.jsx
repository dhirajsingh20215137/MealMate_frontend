import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const NutritionChart = ({ selectedType, setSelectedType, stats, loading, error }) => {
  const chartData = stats
    ? {
        labels: ["Daily", "Weekly", "Monthly"],
        datasets: [
          {
            label: "Target",
            data: [stats.dailyTarget, stats.weeklyTarget, stats.monthlyTarget],
            backgroundColor: "#1F5756",
            borderRadius: 4,
          },
          {
            label: "Achieved",
            data: [stats.dailyAchieved, stats.weeklyAchieved, stats.monthlyAchieved],
            backgroundColor: "White",
            borderRadius: 4,
          },
        ],
      }
    : { labels: [], datasets: [] };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { color: "#fff" } },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10000,
          maxTicksLimit: 6,
          color: "#fff",
          font: { size: 12, weight: "bold" },
          callback: (value) => `${value / 1000}k`,
        },
        grid: { color: "#E0E0E0", borderDash: [4, 4] },
      },
      x: {
        ticks: { color: "#fff", font: { size: 12, weight: "bold" } },
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
    <Box sx={{ p: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: "900px",
          mx: "auto",
          backgroundColor: "#6A9C89",
          color: "#fff",
        }}
      >
        <Typography variant="h4" align="center" fontWeight="bold" mb={3}>
          Nutrition Analysis
        </Typography>

        {/* Button Group for Nutrient Selection */}
        <ButtonGroup fullWidth sx={{ mb: 3 }}>
  {["carbs", "calories", "proteins"].map((type) => (
    <Button
      key={type}
      onClick={() => setSelectedType(type)}
      sx={{
        backgroundColor: "#fff", // Default white background
        color: "#000", // Default black text
        border: "1px solid #15423C",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: "#15423C", // Background on hover
          color: "#fff", // Text color on hover
        },
      }}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Button>
  ))}
</ButtonGroup>


        {/* Loading & Error Handling */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress sx={{ color: "#fff" }} />
          </Box>
        ) : error ? (
          <Typography color="error" align="center" variant="h6">
            {error}
          </Typography>
        ) : (
          <Box sx={{ height: 400 }}>
            <Bar data={chartData} options={options} />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default NutritionChart;
