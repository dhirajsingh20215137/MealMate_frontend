import {
  Card,
  TextField,
  Button,
  Typography,
  MenuItem,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";

const SignupForm = ({
  email,
  password,
  confirmPassword,
  gender,
  weight,
  height,
  targetedCarbs,
  targetedProtein,
  targetedCalories,
  handleChange,
  handleSubmit,
  passwordError,
  loading,
  error,
}) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      padding={4}
     
    >
<Card className="p-10 rounded-xl shadow-lg w-[40vw]  bg-[#6A9C89] text-center text-white max-h-[90vh] ">
<img
          src="/MealMate.png"
          alt="MealMate Logo"
          className="w-24 mx-auto mb-4 bg-[#144442] p-2 rounded-full"
        />

        <Typography variant="h5" className="text-black-300 mb-4">
          Welcome to MealMate
        </Typography>
        <Typography variant="h6" className="text-white ">
          Create an Account
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                error={!!passwordError}
                helperText={passwordError}
                InputLabelProps={{
                  className: "!text-white",
                }}
                InputProps={{
                  className: "!text-white placeholder-white !border-white",
                }}
                className="border-white-100 text-white-100"              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Gender"
                name="gender"
                value={gender || ""} 
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  className: "!text-white",
                }}
                InputProps={{
                  className: "!text-white placeholder-white !border-white",
                }}
                className="border-white-100 text-white-100"              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Weight (kg)"
                type="number"
                name="weight"
                value={weight}
                placeholder="Weight"
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  className: "!text-white",
                }}
                InputProps={{
                  className: "!text-white placeholder-white !border-white",
                }}
                className="border-white-100 text-white-100"              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Height (cm)"
                type="number"
                name="height"
                value={height}
                placeholder="Height"
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  className: "!text-white",
                }}
                InputProps={{
                  className: "!text-white placeholder-white !border-white",
                }}
                className="border-white-100 text-white-100"              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Targeted Carbs (g)"
                type="number"
                name="targetedCarbs"
                value={targetedCarbs}
                placeholder="Targeted Carbs"
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  className: "!text-white",
                }}
                InputProps={{
                  className: "!text-white placeholder-white !border-white",
                }}
                className="border-white-100 text-white-100"              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Targeted Protein (g)"
                type="number"
                name="targetedProtein"
                value={targetedProtein}
                placeholder="Targeted Protein"
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  className: "!text-white",
                }}
                InputProps={{
                  className: "!text-white placeholder-white !border-white",
                }}
                className="border-white-100 text-white-100"              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Targeted Calories"
                type="number"
                name="targetedCalories"
                value={targetedCalories}
                placeholder="Targeted Calories"
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  className: "!text-white",
                }}
                InputProps={{
                  className: "!text-white placeholder-white !border-white",
                }}
                className="border-white-100 text-white-100"              />
            </Grid>

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
                  "Sign Up"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>

        {error && (
          <Typography className="text-red-400 mt-2">{error}</Typography>
        )}

        <Divider className="my-4 bg-gray-300" />

        <Typography className="text-black mb-7">
          Already have an account?{" "}
          <a href="/signin" className="text-black hover:underline">
            Sign In
          </a>
        </Typography>
      </Card>
    </Grid>
  );
};

SignupForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  gender: PropTypes.oneOf(["MALE", "FEMALE", "OTHER"]),
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  targetedCarbs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  targetedProtein: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  targetedCalories: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  passwordError: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default SignupForm;
