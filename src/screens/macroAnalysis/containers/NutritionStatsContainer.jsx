import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, CircularProgress, Typography } from '@mui/material';
import { useAuth } from "../../../auth/index";
import axios from 'axios';
import NutritionChart from '../components/NutritionChart';
import "../../../index.css";
import {getNutritionStats} from "../api";

const HOST = "http://localhost:8081/";

const NutritionStatsContainer = () => {
  const { user, token } = useAuth();
  const [selectedType, setSelectedType] = useState('carbs');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async (type) => {
    if (!user || !token) return; 

    setLoading(true);
    setError(null); 
    const response= await getNutritionStats(user.userId,type,token);
    

    try{
      setStats(response.data);
    }
    catch(error){
      console.error('Error fetching stats:', error);
      setError('Failed to load stats. Please try again.');
    }
    finally{  
      setLoading(false);
    }
    // try {
    //   const response = await axios.get(`${HOST}user/${user.userId}/stats/${type}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   setStats(response.data);
    // } catch (error) {
    //   console.error('Error fetching stats:', error);
    //   setError('Failed to load stats. Please try again.');
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    if (user && token) fetchStats(selectedType);
  }, [selectedType, user, token]);

  return (
    <div className="p-6 w-full mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-screen-2xl mx-auto">
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

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress color="primary" />
          </div>
        ) : error ? (
          <Typography color="error" align="center" variant="h6" sx={{ mt: 4 }}>
            {error}
          </Typography>
        ) : (
          <NutritionChart stats={stats} />
        )}
      </div>
    </div>
  );
};

export default NutritionStatsContainer;
