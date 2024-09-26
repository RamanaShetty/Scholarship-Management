// GovApplicationsCards.js
import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GovApplicationsCards = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8080/api/std/v1/application",
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
      } catch (err) {
        console.log(err);
      }
    };

    fetchApplications();
  }, []);

  const handleCardClick = (application) => {
    navigate(`/gov/applications/${application.application_id}`, {
      state: { application },
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Grid2 container spacing={3}>
        {applications.map((application) => (
          <Grid2
            size={{ xs: 12, sm: 6, md: 4 }}
            key={application.application_id}
          >
            <Card
              onClick={() => handleCardClick(application)}
              sx={{
                cursor: "pointer",
                borderRadius: 3,
                boxShadow: 3,
                width: "100%",
                height: "auto",
                background:
                  application.status === "accepted" ? "#eafaea" : "#fff5e6",
                border:
                  application.status === "accepted"
                    ? "3px solid green"
                    : "3px solid orange",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: "1.5rem", mb: 2 }}
                >
                  {application.program_name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "left", fontSize: "1rem", mb: 1 }}
                >
                  <strong>Student Name:</strong> {application.student_name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "left", fontSize: "1rem", mb: 1 }}
                >
                  <strong>Institute:</strong> {application.institute_name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "left", fontSize: "1rem" }}
                >
                  <strong>Status:</strong> {application.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default GovApplicationsCards;
