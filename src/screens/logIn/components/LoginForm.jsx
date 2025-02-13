import { TextField, Button, Typography, Card, Divider, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import "../../../index.css"

const LoginForm = ({ email, password, handleChange, handleSubmit, loading, error }) => {
    return (
        <div className="flex justify-center items-center min-h-screen  bg-fixed p-4">
            <Card
                className="p-8 rounded-xl shadow-lg w-full max-w-md text-center"
                sx={{ backgroundColor: "#6A9C89", color: "white" }} 
            >
                <img
                    src="/MealMate.png"
                    alt="MealMate Logo"
                    className="w-24 mx-auto mb-4"
                    style={{ backgroundColor: "#144442", padding: "8px", borderRadius: "50%" }}
                />

                <Typography variant="h5" className="text-white-800 mb-4">Welcome to MealMate</Typography>
                <Typography variant="h6" className="text-white">SignIn to Your Account</Typography>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{
                            '& label': {
                                transform: 'translate(14px, -10px) scale(0.75)',
                                backgroundColor: "#fff",
                                padding: "0 6px",
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: '#16423C',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#16423C',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#16423C',
                                },
                            },
                            backgroundColor: "white",
                            borderRadius: "4px",
                        }}
                    />

                    {/* Password Field */}
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                        required
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{
                            '& label': {
                                transform: 'translate(14px, -10px) scale(0.75)',
                                backgroundColor: "#fff",
                                padding: "0 6px",
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: '#16423C',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#16423C',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#16423C',
                                },
                            },
                            backgroundColor: "white",
                            borderRadius: "4px",
                        }}
                    />

                    <div className="flex justify-between items-center text-black-800 text-sm">
                        <a href="#" className="text-black-800 hover:underline">Forgot password?</a>
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                            backgroundColor: "#16423C",
                            color: "white",
                            "&:hover": { backgroundColor: "rgb(21, 128, 61)", color: "white" },
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                    </Button>
                </form>

                {error && <Typography className="text-red-400 mt-2">{error}</Typography>}

                <Divider className="my-4 bg-gray-300" />

                <Typography className="text-black mt-4">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-white hover:underline">Sign up</a>
                </Typography>
            </Card>
        </div>
    );
};

LoginForm.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.string,
};

export default LoginForm;
