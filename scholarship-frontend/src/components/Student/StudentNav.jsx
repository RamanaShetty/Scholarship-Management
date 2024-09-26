import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";

const StudentNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
        padding: "0 20px",
        borderBottom: "2px solid #fff",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton size="large" edge="start" color="inherit">
            <SchoolIcon sx={{ fontSize: "36px", marginRight: 1 }} />
          </IconButton>
          <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
            Gradious Scholarships
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 4 }}>
          <Link to="/student" style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  color: "#FFD54F",
                  borderBottom: "2px solid #FFD54F",
                },
              }}
            >
              Scholarships
            </Button>
          </Link>
          <Link to="/applications" style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  color: "#FFD54F",
                  borderBottom: "2px solid #FFD54F",
                },
              }}
            >
              Applications
            </Button>
          </Link>
        </Box>

        <IconButton
          color="inherit"
          onClick={handleLogout}
          sx={{
            backgroundColor: "#fff",
            color: "#2196F3",
            borderRadius: "20px",
            padding: "6px 12px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s, transform 0.2s",
            "&:hover": {
              backgroundColor: "#e0f7fa",
              transform: "scale(1.05)",
            },
          }}
        >
          <LogoutIcon />
          <Typography
            variant="button"
            sx={{ marginLeft: "4px", fontWeight: "bold" }}
          >
            Logout
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default StudentNavbar;
