export const UseLogin = async (credentials) => {
    try {
        const response = await fetch('http://localhost:8081/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'UseLogin failed');
        }

        return data;

    } catch (error) {
        throw new Error(error.message || 'Something went wrong during login');
    }
};