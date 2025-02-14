import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/index";
import { loginUser } from "../api";
import LoginForm from "../components/LoginForm";
import "../../../index.css";

const LoginContainer = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(formData);
            login(data.token, data.user);
            alert("Login Successful!");
            navigate("/meal-library"); 
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <LoginForm 
            email={formData.email}
            password={formData.password}
            handleChange={handleChange} 
            handleSubmit={handleSubmit}
            errorMessage={errorMessage}
        />
    );
};

export default LoginContainer;
