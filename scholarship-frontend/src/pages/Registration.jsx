import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Reset error for the specific field being edited
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};

    // Check if name is empty
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    // Check if email is valid
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    // Check password length and set errors
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // Show confirm password error only if password is validated
    if (formData.password && !formData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (formData.password && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match. Please try again";
    }

    // Check if age is valid
    if (!formData.age) {
      errors.age = "Age is required";
    } else if (isNaN(formData.age) || formData.age <= 0) {
      errors.age = "Please enter a valid age";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
        setDialogOpen(true); // Open the dialog if there are errors
        return; // Don't proceed if there are errors
    }

    // Log the form data before sending
    console.log("Form Data:", formData);

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
            const errorData = await response.json(); // Attempt to parse error response
            throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        console.log("Registration successful:", data);
        navigate("/student");
    } catch (error) {
        console.error("Error during registration:", error);
        setDialogOpen(true); // Show error dialog on registration failure
        setFormErrors({ general: error.message }); // Set a general error message
    }
};


  // Automatically close the dialog after a few seconds
  useEffect(() => {
    let timer;
    if (dialogOpen) {
      timer = setTimeout(() => {
        setDialogOpen(false);
      }, 3000); // Dialog will disappear after 3 seconds
    }
    return () => clearTimeout(timer); // Cleanup the timer
  }, [dialogOpen]);

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
        position: "relative", // For dialog positioning
      }}
    >
            {/* Dialog for errors */}
            <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        PaperProps={{
          style: {
            position: "fixed",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            zIndex: 9999, // Ensure it is on top
          },
        }}
      >
        <DialogTitle sx={{ color: "red" }}>Error</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {Object.values(formErrors).map((error, index) => (
              <Typography key={index} style={{ color: "black" }}>
                {error}
              </Typography>
            ))}
          </Typography>
        </DialogContent>
      </Dialog>


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
            error={!!formErrors.name}
            helperText={formErrors.name}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
            fullWidth
            error={!!formErrors.age}
            helperText={formErrors.age}
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            error={!!formErrors.password}
            helperText={formErrors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
            disabled={formData.password.length < 6} // Disable until password is valid
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
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
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegistrationForm;
