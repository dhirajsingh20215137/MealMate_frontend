import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Private  from "../components";
import { useAuth } from "../../../auth";

const PrivateContainer = () => {
  const { token } = useAuth();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!token) {
      navigateTo("/signin");
    }
  }, [token, navigateTo]);

  return <Private />;
};

export default PrivateContainer;
