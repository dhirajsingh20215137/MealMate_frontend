import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseSignup } from "../api";
import SignupForm from "../components/SignupForm";
import Cookies from "js-cookie";

const SignupContainer = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    weight: "",
    height: "",
    targetedCarbs: "",
    targetedProtein: "",
    targetedCalories: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup, loading } = UseSignup();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setPasswordError("");
    setError("");
  };

  const handleSubmit = async () => {
   

    const { email, password, confirmPassword, gender, weight, height, targetedCarbs, targetedProtein, targetedCalories } = formData;

    if (!email || !password || !confirmPassword ) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const data = await signup({
        email,
        password,
        gender:gender?gender:null,
        weight: parseFloat(weight),
        height: parseFloat(height),
        targetedCarbs: parseFloat(targetedCarbs),
        targetedProtein: parseFloat(targetedProtein),
        targetedCalories: parseFloat(targetedCalories),
      });

      if (data && data.token) {
        Cookies.set("token", data.token, { expires: 30 });
        sessionStorage.setItem("email", email);

        alert("Signup Successful");
        navigate("/signin");
      } else {
        setError("Signup failed, please try again.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    }
  };

  return (
    <SignupForm
      email={formData.email}
      password={formData.password}
      confirmPassword={formData.confirmPassword}
      gender={formData.gender}
      weight={formData.weight}
      height={formData.height}
      targetedCarbs={formData.targetedCarbs}
      targetedProtein={formData.targetedProtein}
      targetedCalories={formData.targetedCalories}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      passwordError={passwordError}
      loading={loading}
      error={error}
    />
  );
};

export default SignupContainer;
