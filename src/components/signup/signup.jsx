import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseSignup } from "../../logics/useSignup.js";
import Cookies from 'js-cookie';
import { z } from 'zod';
import "./signup.css";

const signupSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { signup, loading, error } = UseSignup(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = { email, password };


            signupSchema.parse(userData);


            const data = await signup(userData);


            if (data && data.token) {
                Cookies.set('token', data.token, { expires: 30 });
                sessionStorage.setItem('email', email);

                alert('Signup Successful');
                navigate('/signin');
            } else {
                alert('Signup failed, please try again.');
            }
        } catch (error) {
            alert(error.message || 'An unexpected error occurred');
        }
    };

    return (
        <div className="container">
            <div className="card">
                <img src="/MealMate.png" alt="MealPlanner Logo" className="logo" />
                <div className="header">
                    <h2 className="title">Create an Account</h2>
                    <p className="subtitle">Welcome to MealMate</p>
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

                    <button type="submit" className="submitButton" disabled={loading}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                {/* Show error message if present */}
                {error && <p className="error">{error}</p>}

                <div className="divider">OR</div>

                <button className="googleButton">
                    Sign up with Google
                </button>

                <p className="signup">
                    Already have an account?{" "}
                    <a href="/signin" className="signupLink">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
