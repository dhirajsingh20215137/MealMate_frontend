import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseLogin } from "../../logics/useLogin.js";
import { useAuth } from "../../auth/authContext.jsx";  // ✅ Import useAuth

import "./login.css";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();  // ✅ Use login from AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { email, password };

        try {
            const data = await UseLogin(credentials); // ✅ API response should contain token & user

            // ✅ Store token and user in AuthContext
            login(data.token, data.user);  

            alert("Login Successful!");
            navigate("/");  // Redirect to homepage
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <img src="/MealMate.png" alt="MealPlanner Logo" className="logo" />
                <div className="header">
                    <h3 className="title">Welcome Back</h3>
                    <h2 className="subtitle">Welcome to MealMate</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        required
                    />

                    <div className="rememberForgot">
                        <label className="checkboxLabel">
                            <input type="checkbox" /> Remember me for 30 days
                        </label>
                        <a href="#" className="forgotPassword">Forgot password?</a>
                    </div>

                    <button type="submit" className="submitButton">Sign In</button>
                </form>

                {errorMessage && <p className="error">{errorMessage}</p>}

                <div className="divider">OR</div>

                <button className="googleButton">Sign in with Google</button>

                <p className="signup">
                    Don’t have an account?{" "}
                    <a href="/signup" className="signupLink">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
