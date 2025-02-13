import {
  TextField,
  Button,
  Typography,
  Card,
  Divider,
  CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";

const SignupForm = ({
  email,
  password,
  confirmPassword,
  handleChange,
  handleSubmit,
  passwordError,
  loading,
  error,
}) => {
  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <Card
        className="p-8 rounded-xl shadow-lg w-full max-w-md text-center"
        sx={{ backgroundColor: "#6A9C89", color: "white" }}
      >
        <img
          src="/MealMate.png"
          alt="MealMate Logo"
          className="w-24 mx-auto mb-4"
          style={{
            backgroundColor: "#144442",
            padding: "8px",
            borderRadius: "50%",
          }}
        />

        <Typography variant="h5" className="text-black-300 mb-4">
          Welcome to MealMate
        </Typography>
        <Typography variant="h6" className="text-white">
          Create an Account
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& label": {
                transform: "translate(14px, -10px) scale(0.75)",
                backgroundColor: "#fff",
                padding: "0 6px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#16423C",
                },
                "&:hover fieldset": {
                  borderColor: "#16423C",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#16423C",
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
            value={password}
            placeholder="Password"
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& label": {
                transform: "translate(14px, -10px) scale(0.75)",
                backgroundColor: "#fff",
                padding: "0 6px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#16423C",
                },
                "&:hover fieldset": {
                  borderColor: "#16423C",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#16423C",
                },
              },
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          />

          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            error={!!passwordError}
            helperText={passwordError}
            sx={{
              "& label": {
                transform: "translate(14px, -10px) scale(0.75)",
                backgroundColor: "#fff",
                padding: "0 6px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#16423C",
                },
                "&:hover fieldset": {
                  borderColor: "#16423C",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#16423C",
                },
              },
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: "#16423C", // White background
              color: "white", // Black text color
              "&:hover": {
                backgroundColor: "rgb(21, 128, 61)",
                color: "white",
              }, // Green hover with white text
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        {error && (
          <Typography className="text-red-400 mt-2">{error}</Typography>
        )}

        <Divider className="my-4 bg-gray-300" />

        <Typography className="text-black mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-white hover:underline">
            Sign In
          </a>
        </Typography>
      </Card>
    </div>
  );
};

SignupForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  passwordError: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default SignupForm;
