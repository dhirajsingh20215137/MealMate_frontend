import { useState } from "react";

export const UseSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const signup = async (userData) => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8081/auth/signup', {
                method: 'POST',
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            return data; // Assuming this returns a token or some other necessary data
        } catch (error) {
            setError(error.message || 'Something went wrong during signup');
            throw error;  // This will propagate the error to the calling component
        } finally {
            setLoading(false);
        }
    };

    return { signup, loading, error };
};
