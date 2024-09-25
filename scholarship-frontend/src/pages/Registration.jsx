import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    age: "",
    GPA: "",
    institute_name: "",
    institute_code: "",
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
      const response = await fetch(
        "http://localhost:8080/api/std/v1/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        width: "700px",
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
            Student Registration
          </Typography>

          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="GPA"
            name="GPA"
            type="number"
            value={formData.GPA}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Institute Name"
            name="institute_name"
            value={formData.institute_name}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Institute Code"
            name="institute_code"
            value={formData.institute_code}
            onChange={handleChange}
            required
            fullWidth
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
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegistrationForm;
