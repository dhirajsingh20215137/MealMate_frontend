import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Public  from "../components";
import { useAuth } from "../../../auth/index";

const PublicContainer = () => {
  const { token } = useAuth();
  const navigateTo = useNavigate(); 

  useEffect(() => {
    if (token) {
      navigateTo("/plan-meal"); 
    }
  }, [token, navigateTo]); 

  return <Public />;
};

export default PublicContainer;
