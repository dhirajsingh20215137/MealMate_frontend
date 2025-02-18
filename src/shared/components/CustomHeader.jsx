import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth";
import { AppBar, Toolbar, Drawer, IconButton, Button, Grid, Box, Typography } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { useState } from "react";

const CustomHeader = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const getButtonClasses = (path) => ({
    backgroundColor: location.pathname === path ? "#6A9C89" : "transparent",
    color: "white",
    padding: "8px 16px",
    borderRadius: "8px",
    transition: "background 0.3s",
    "&:hover": { backgroundColor: "#6A9C89" },
  });

  const navLinks = user
    ? [
        { path: "/meal-library", label: "Meal Library" },
        { path: "/profile", label: "Profile" },
        { path: "/nutrition-stats", label: "Macro Analysis" },
        { path: "/plan-meal", label: "Plan Meal" },
      ]
    : [
        { path: "/signup", label: "Signup" },
        { path: "/signin", label: "Login" },
      ];

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#16423C", boxShadow: 1 }}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
          
            <Grid item sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Link to="/profile">
                <Box
                  component="img"
                  src="/MealMate.png"
                  alt="MealMate Logo"
                  sx={{ width: 56, height: 56, borderRadius: "50%", backgroundColor: "#144442", padding: 1 }}
                />
              </Link>
              <Typography variant="h6" color="white" fontWeight="bold">
                MealMate
              </Typography>

              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                {user &&
                  navLinks.map(({ path, label }) => (
                    <Button key={path} component={Link} to={path} sx={getButtonClasses(path)}>
                      {label}
                    </Button>
                  ))}
              </Box>
            </Grid>

            <Grid item sx={{ display: { xs: "none", md: "flex" } }}>
              {user ? (
                <Button sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "#6A9C89", color: "white" } }} onClick={logout}>
                  Logout
                </Button>
              ) : (
                navLinks.map(({ path, label }) => (
                  <Button key={path} component={Link} to={path} sx={getButtonClasses(path)}>
                    {label}
                  </Button>
                ))
              )}
            </Grid>

         
            <Grid item sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton sx={{ color: "white" }} onClick={() => setOpen(true)}>
                <MenuIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

     
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, height: "100%", backgroundColor: "#16423C", color: "white", padding: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>

      
          {navLinks.map(({ path, label }) => (
            <Button key={path} fullWidth component={Link} to={path} sx={{ color: "white", marginY: 1, "&:hover": { backgroundColor: "#6A9C89" } }} onClick={() => setOpen(false)}>
              {label}
            </Button>
          ))}

        
          {user && (
            <Button fullWidth sx={{ backgroundColor: "white", color: "black", marginTop: 2, "&:hover": { backgroundColor: "#6A9C89", color: "white" } }} onClick={logout}>
              Logout
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default CustomHeader;
