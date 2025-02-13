import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ProfileForm = ({ profile, onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 w-80">
           <FormControl fullWidth sx={{ 
  "& .MuiOutlinedInput-root": {                              // Border styling
    "& fieldset": { borderColor: "white" },                  // Default border color
    "&:hover fieldset": { borderColor: "white" },            // Hover effect
    "&.Mui-focused fieldset": { borderColor: "white" },      // Focus effect
  },
  "& .MuiInputLabel-root": { color: "white" },               // Label color
  "& .MuiInputLabel-root.Mui-focused": { color: "white" },   // Focused label color
  "& .MuiSelect-select": { color: "white" },                 // Selected text color
  "& .MuiSelect-icon": { color: "white" }                    // Dropdown icon color
}}>
  {/* <InputLabel>Select Gender</InputLabel>                      */}
  <Select
    name="gender"
    value={profile.gender || ""}
    onChange={onChange}
    displayEmpty
  >
    <MenuItem value="" disabled>Select Gender</MenuItem>      {/* Placeholder */}
    <MenuItem value="MALE">Male</MenuItem>
    <MenuItem value="FEMALE">Female</MenuItem>
    <MenuItem value="OTHER">Other</MenuItem>
  </Select>
</FormControl>


            {[
                { label: "Weight (kg)", name: "weight" },
                { label: "Height (cm)", name: "height" },
                { label: "Targeted Carbs (g)", name: "targetedCarbs" },
                { label: "Targeted Protein (g)", name: "targetedProtein" },
                { label: "Targeted Calories", name: "targetedCalories" },
            ].map((field) => (
                <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                type="number"
                value={profile[field.name] || ""}
                onChange={onChange}
                fullWidth
                sx={{
                  "& .MuiInputLabel-root": { color: "white" },               
                  "& .MuiInputLabel-root.Mui-focused": { color: "white" },  
                  "& .MuiOutlinedInput-root": {                              
                    "& fieldset": { borderColor: "white" },                 
                    "&:hover fieldset": { borderColor: "white" },            
                    "&.Mui-focused fieldset": { borderColor: "white" },     
                  },
                  "& .MuiInputBase-input": { color: "white" }                
                }}
              />
              
            ))}

<Button
  type="submit"
  variant="contained"
  fullWidth
  sx={{
    backgroundColor: "#15423C",
    "&:hover": {
      backgroundColor: "#0F322E", // Slightly darker shade on hover
    },
  }}
>
  Update Profile
</Button>

        </form>
    );
};

export default ProfileForm;
