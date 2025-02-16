import {
  Alert,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Paper,
  Box,
  Grid,
} from "@mui/material";

const HOST = "http://localhost:8081";

const ProfileComponent = ({
  profile,
  setProfile,
  notification,
  setNotification,
  handleSubmit,
  handlePasswordChange,
  handlePhotoChange,
  fileErrorMessage,
  passwordData,
  setPasswordData,
  passwordLoading,
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      p: 6,
      minHeight: "100vh",
    }}
  >
    <Typography variant="h4" fontWeight="bold" mb={2}>
      User Profile
    </Typography>

    <Paper
      elevation={4}
      sx={{
        display: "flex",
        borderRadius: 2,
        p: 4,
        gap: 4,
        backgroundColor: "#6A9C89",
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={3}
        sx={{ width: "350px" }}
      >
        <Grid item>
          <img
            src={
              profile?.userUrl ? `${HOST}/${profile.userUrl}` : "/MealMate.png"
            }
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover border-2 border-gray-300"
          />
        </Grid>

        <Grid item>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handlePhotoChange}
          />
          {fileErrorMessage && (
            <Typography color="error" variant="body2">
              {fileErrorMessage}
            </Typography>
          )}
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <TextField
            label="Current Password"
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
            fullWidth
            InputLabelProps={{
              className: "!text-white",
            }}
            InputProps={{
              className: "!text-white placeholder-white !border-white",
            }}
            className="border-white-100 text-white-100"
          />
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <TextField
            label="New Password"
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            fullWidth
            InputLabelProps={{
              className: "!text-white",
            }}
            InputProps={{
              className: "!text-white placeholder-white !border-white",
            }}
            className="border-white-100 text-white-100"
          />
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confirmPassword: e.target.value,
              })
            }
            fullWidth
            InputLabelProps={{
              className: "!text-white",
            }}
            InputProps={{
              className: "!text-white placeholder-white !border-white",
            }}
            className="border-white-100 text-white-100"
          />
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Button
            onClick={handlePasswordChange}
            fullWidth
            disabled={passwordLoading}
            className="bg-[#15423C] hover:bg-[#0F322E] text-white font-semibold py-2 px-4 rounded focus:ring-0 focus:outline-none active:bg-[#0C2925] disabled:opacity-50"
          >
            {passwordLoading ? (
              <CircularProgress size={24} className="text-white" />
            ) : (
              "Update Password"
            )}
          </Button>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        {/* Gender Selection */}
        <FormControl fullWidth className="border border-white rounded">
          <Select
            name="gender"
            value={profile.gender || ""}
            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
            displayEmpty
            className="text-white"
          >
            <MenuItem value="" disabled>
              Select Gender
            </MenuItem>
            <MenuItem value="MALE">Male</MenuItem>
            <MenuItem value="FEMALE">Female</MenuItem>
            <MenuItem value="OTHER">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Weight(kg)"
          name="weight"
          type="number"
          value={profile.weight || ""}
          onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
          fullWidth
          className="text-white border border-white rounded"
          InputLabelProps={{ className: "text-white" }}
          InputProps={{ className: "text-white" }}
        />

        <TextField
          label="Height(cm)"
          name="height"
          type="number"
          value={profile.height || ""}
          onChange={(e) => setProfile({ ...profile, height: e.target.value })}
          fullWidth
          className="text-white border border-white rounded"
          InputLabelProps={{ className: "text-white" }}
          InputProps={{ className: "text-white" }}
        />

        <TextField
          label="Targeted Carbs(g)"
          name="targetedCarbs"
          type="number"
          value={profile.targetedCarbs || ""}
          onChange={(e) =>
            setProfile({ ...profile, targetedCarbs: e.target.value })
          }
          fullWidth
          className="text-white border border-white rounded"
          InputLabelProps={{ className: "text-white" }}
          InputProps={{ className: "text-white" }}
        />

        <TextField
          label="Targeted Protein(g)"
          name="targetedProtein"
          type="number"
          value={profile.targetedProtein || ""}
          onChange={(e) =>
            setProfile({ ...profile, targetedProtein: e.target.value })
          }
          fullWidth
          className="text-white border border-white rounded"
          InputLabelProps={{ className: "text-white" }}
          InputProps={{ className: "text-white" }}
        />

        <TextField
          label="Targeted Calories(g)"
          name="targetedCalories"
          type="number"
          value={profile.targetedCalories || ""}
          onChange={(e) =>
            setProfile({ ...profile, targetedCalories: e.target.value })
          }
          fullWidth
          className="text-white border border-white rounded"
          InputLabelProps={{ className: "text-white" }}
          InputProps={{ className: "text-white" }}
        />

        <Button
          type="submit"
          fullWidth
          className="bg-[#15423C] hover:bg-[#0F322E] text-white font-semibold py-2 px-4 rounded focus:ring-0 focus:outline-none active:bg-[#0C2925]"
        >
          Update Profile
        </Button>
      </form>
    </Paper>
  </Box>
);

export default ProfileComponent;
