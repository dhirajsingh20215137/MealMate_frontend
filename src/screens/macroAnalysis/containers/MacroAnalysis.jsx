import React, { useState, useEffect } from "react";
import { useAuth } from "../../../auth/index";
import { getNutritionStats } from "../api";
import NutritionChart from "../components/MacroAnalysis";

const NutritionStats = () => {
  const { user, token } = useAuth();
  const [selectedType, setSelectedType] = useState("carbs");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async (type) => {
    if (!user || !token) return;

    setLoading(true);
    setError(null);
    try {
      const response = await getNutritionStats(user.userId, type, token);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setError("Failed to load stats. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && token) fetchStats(selectedType);
  }, [selectedType, user, token]);

  return (
    <NutritionChart
      selectedType={selectedType}
      setSelectedType={setSelectedType}
      stats={stats}
      loading={loading}
      error={error}
    />
  );
};

export default NutritionStats;
