import { TextField, Button, FormControl, Select, MenuItem } from "@mui/material";

const ProfileForm = ({ profile, onChange, onSubmit, passwordData, setPasswordData, handlePasswordChange}) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 w-80">
            <FormControl fullWidth sx={{
                "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, "&:hover fieldset": { borderColor: "white" }, "&.Mui-focused fieldset": { borderColor: "white" } },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiSelect-select": { color: "white" },
                "& .MuiSelect-icon": { color: "white" }
            }}>
                <Select name="gender" value={profile.gender || ""} onChange={onChange} displayEmpty>
                    <MenuItem value="" disabled>Select Gender</MenuItem>
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                </Select>
            </FormControl>

            {["weight", "height", "targetedCarbs", "targetedProtein", "targetedCalories"].map((field) => (
                <TextField key={field} label={field} name={field} type="number" value={profile[field] || ""} onChange={onChange} fullWidth sx={{
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, "&:hover fieldset": { borderColor: "white" }, "&.Mui-focused fieldset": { borderColor: "white" } },
                    "& .MuiInputBase-input": { color: "white" }
                }} />
            ))}

            <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#15423C", "&:hover": { backgroundColor: "#0F322E" } }}>Update Profile</Button>

            {/* Password Update Section */}
            <TextField
    label="Current Password"
    type="password"
    name="currentPassword"
    value={passwordData.currentPassword}
    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
    fullWidth
/>
<TextField
    label="New Password"
    type="password"
    name="newPassword"
    value={passwordData.newPassword}
    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
    fullWidth
/>
<TextField
    label="Confirm Password"
    type="password"
    name="confirmPassword"
    value={passwordData.confirmPassword}
    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
    fullWidth
    
/>
            <Button onClick={handlePasswordChange} variant="contained" fullWidth sx={{ backgroundColor: "#15423C", "&:hover": { backgroundColor: "#0F322E" } }}>Update Password</Button>
        </form>
    );
};

export default ProfileForm;
