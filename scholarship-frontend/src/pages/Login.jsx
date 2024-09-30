import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/login.css";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const LoginForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: location.state?.role || "student",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validation = () => {
    const error = {}
    if (!/\S+@\S+\.\S+/.test(formData.email) || !formData.email.trim()) {
      error.email = "Invalid email : Please check your email";
    }

    if (formData.password.length < 6) {
      error.password = "Invalid Password : Please check your password";
    }

    setValidationErrors(error);

    if (Object.keys(error).length === 0) {
      return true;
    } else {
      setOpenDialog(true);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validation()) {
      return; // Exit if validation fails
    }

    try {
      const response = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        setValidationErrors({ password: "Unauthorized: Please check your email and password." });
        setOpenDialog(true);
        setTimeout(() => setOpenDialog(false), 3000); // Close dialog after 5 seconds
        return; // Exit if unauthorized
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const { token = "", role = "" } = data;

      localStorage.setItem("token", token);

      if (role === "student") {
        navigate("/student");
      } else if (role === "government") {
        navigate("/gov");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setValidationErrors({ general: "An error occurred during login. Please try again." });
      setOpenDialog(true);
      setTimeout(() => setOpenDialog(false), 3000); // Close dialog after 5 seconds
    }
  };

  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        width: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: 4,
          borderRadius: 4,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
          backgroundColor: "#fff",
          width: "100%",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Login
          </Typography>

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            sx={{ borderRadius: 2 }}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            sx={{ borderRadius: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              paddingY: 1.5,
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#155a9d",
              },
              fontWeight: "bold",
              fontSize: "1rem",
              borderRadius: 3,
            }}
          >
            Login
          </Button>
          {location.state?.role === "student" && (
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Not registered yet? <Link to="/register">Register here</Link>
            </Typography>
          )}
        </Box>
      </Paper>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            marginBottom: '25%',
            maxWidth: '400px',
            width: '80%',
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
          },
        }}>
        <DialogTitle sx={{ color: 'red' }}>Error</DialogTitle>
        <DialogContent sx={{ color: 'black' }}>
          {validationErrors.password && <p>{validationErrors.password}</p>}
          {validationErrors.email && <p>{validationErrors.email}</p>}
          {validationErrors.general && <p>{validationErrors.general}</p>}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default LoginForm;
