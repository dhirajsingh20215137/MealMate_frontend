import {
  TextField,
  Button,
  Typography,
  Card,
  Divider,
  CircularProgress,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import "../../../index.css";

const LoginForm = ({
  email,
  password,
  handleChange,
  handleSubmit,
  loading,
  error,
}) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="min-h-screen bg-fixed p-4"
      backgroundColor="white"
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card className="p-8 rounded-xl shadow-lg w-full text-center bg-[#6A9C89] text-white">
          <img
            src="/MealMate.png"
            alt="MealMate Logo"
            className="w-24 mx-auto mb-4 bg-[#144442] p-2 rounded-full"
          />

          <Typography variant="h5" className="mb-4">
            Welcome to MealMate
          </Typography>
          <Typography variant="h6">Sign In to Your Account</Typography>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
                  className: "!text-white",
                }}
                InputProps={{
                  className: "!text-white placeholder-white !border-white",
                }}
                className="border-white-100 text-white-100"
              />


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
                  className: "!text-white",
                }}
                InputProps={{
                  className: "!text-white placeholder-white !border-white",
                }}
                className="border-white-100 text-white-100"
              />

           

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                className="!bg-[#136A5A] text-white hover:!bg-[#16423C]"
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </Grid>
          </form>

          {error && (
            <Typography className="text-red-400 mt-2">{error}</Typography>
          )}

          <Divider className="my-4 bg-gray-300" />

          <Typography className="text-white mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-white hover:underline">
              Sign up
            </a>
          </Typography>
        </Card>
      </Grid>
    </Grid>
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
