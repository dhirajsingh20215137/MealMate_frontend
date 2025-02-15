import { Snackbar, Alert, TextField, Button, FormControl, Select, MenuItem, CircularProgress, Typography, Paper, Box, Grid } from "@mui/material";

const HOST = "http://localhost:8081";

const ProfileComponent = ({ profile, setProfile, notification, setNotification, handleSubmit, handlePasswordChange, handlePhotoChange, fileErrorMessage, passwordData, setPasswordData, passwordLoading }) => (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 6, minHeight: "100vh" }}>
        {/* Notification Snackbar */}
        <Snackbar open={!!notification.message} autoHideDuration={3000} onClose={() => setNotification({ message: "", type: "" })}>
            <Alert severity={notification.type} sx={{ width: "100%" }}>
                {notification.message}
            </Alert>
        </Snackbar>

        {/* Title */}
        <Typography variant="h4" fontWeight="bold" mb={2}>
            User Profile
        </Typography>

        {/* Profile Container */}
        <Paper elevation={4} sx={{ display: "flex", borderRadius: 2, p: 4, gap: 4, backgroundColor: "#6A9C89" }}>
            {/* Left Section: Profile Photo & Password Update */}
            <Grid container direction="column" alignItems="center" spacing={3} sx={{ width: "350px" }}>
                {/* Profile Photo */}
                <Grid item>
                    <img
                        src={`${HOST}/${profile.userUrl}` || "/MealMate.png"}
                        alt="Profile"
                        className="w-48 h-48 rounded-full object-cover border-2 border-gray-300"
                    />
                </Grid>

                {/* File Upload */}
                <Grid item>
                    <input type="file" accept="image/png, image/jpeg" onChange={handlePhotoChange} />
                    {fileErrorMessage && <Typography color="error" variant="body2">{fileErrorMessage}</Typography>}
                </Grid>

                {/* Password Update Section */}
                <Grid item sx={{ width: "100%" }}>
                    <TextField
                        label="Current Password"
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        fullWidth
                    />
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                    <TextField
                        label="New Password"
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        fullWidth
                    />
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                    <TextField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        fullWidth
                    />
                </Grid>

                {/* Update Password Button */}
                <Grid item sx={{ width: "100%" }}>
                    <Button
                        onClick={handlePasswordChange}
                        variant="contained"
                        fullWidth
                        sx={{ backgroundColor: "#15423C", "&:hover": { backgroundColor: "#0F322E" } }}
                        disabled={passwordLoading}
                    >
                        {passwordLoading ? <CircularProgress size={24} /> : "Update Password"}
                    </Button>
                </Grid>
            </Grid>

            {/* Right Section: Profile Form (Unchanged) */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
                {/* Gender Selection */}
                <FormControl fullWidth className="border border-white rounded">
                    <Select name="gender" value={profile.gender || ""} onChange={(e) => setProfile({ ...profile, gender: e.target.value })} displayEmpty className="text-white">
                        <MenuItem value="" disabled>Select Gender</MenuItem>
                        <MenuItem value="MALE">Male</MenuItem>
                        <MenuItem value="FEMALE">Female</MenuItem>
                        <MenuItem value="OTHER">Other</MenuItem>
                    </Select>
                </FormControl>

                {/* Input Fields */}
                {["weight", "height", "targetedCarbs", "targetedProtein", "targetedCalories"].map((field) => (
                    <TextField
                        key={field}
                        label={field}
                        name={field}
                        type="number"
                        value={profile[field] || ""}
                        onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
                        fullWidth
                        className="text-white border border-white rounded"
                        InputLabelProps={{ className: "text-white" }}
                        InputProps={{ className: "text-white" }}
                    />
                ))}

                {/* Update Profile Button */}
                <Button 
    type="submit" 
    variant="contained" 
    fullWidth 
    sx={{ backgroundColor: "#15423C", "&:hover": { backgroundColor: "#0F322E" } }}
>
    Update Profile
</Button>

            </form>
        </Paper>
    </Box>
);

export default ProfileComponent;
