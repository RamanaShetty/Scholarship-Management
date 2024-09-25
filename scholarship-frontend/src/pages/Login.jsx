import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/login.css";

const LoginForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: location.state?.role || "student", // Default to student if no role is provided
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const { token, role } = data;

      localStorage.setItem("token", token);

      if (role === "student") {
        navigate("/student");
      } else if (role === "government") {
        navigate("/gov");
      }
    } catch (error) {
      console.error("Error during login:", error);
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
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            sx={{ borderRadius: 2 }}
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

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Not registered yet? <Link to="/register">Register here</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
