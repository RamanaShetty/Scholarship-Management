import React, { useEffect, useState } from "react";
import { Typography, Box, Card, CardContent, Grid2 } from "@mui/material";

const ApplicationCard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `http://localhost:8080/api/std/applications/v1`,
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApplications();
  }, []);

  // Function to get background color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "#4caf50"; // Green
      case "Declined":
        return "#f44336"; // Red
      case "Pending":
        return "#ffa726"; // Orange
      default:
        return "#1976d2"; // Default Blue
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        My Applications
      </Typography>
      <Grid2 container spacing={4} justifyContent="center">
        {applications.map((app) => (
          <Grid2 item xs={12} sm={6} md={4} lg={3} key={app.application_id}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                transition: "0.3s",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                "&:hover": {
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
                  transform: "translateY(-8px)",
                },
                background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
              }}
            >
              <CardContent
                sx={{
                  padding: 2,
                  textAlign: "center",
                  background: getStatusColor(app.status), // Set background color based on status
                  color: "#ffffff",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {app.program_name}
                </Typography>
              </CardContent>
              <CardContent sx={{ padding: 2, textAlign: "left" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 1 }}
                >
                  Application Date:{" "}
                  {new Date(app.application_date).toLocaleDateString()}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 1 }}
                >
                  Deadline: {new Date(app.deadline).toLocaleDateString()}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 1 }}
                >
                  Deadline: {new Date(app.deadline).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Status: {app.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default ApplicationCard;
