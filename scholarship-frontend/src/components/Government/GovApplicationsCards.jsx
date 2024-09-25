import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid2,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useNavigate } from "react-router-dom";

const GovApplicationsCards = () => {
  const [applications, setApplications] = useState([]);

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

  const handleAccept = async (applicationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/std/v1/approve/${applicationId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept the application");
      } else {
        console.log("accepted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async (applicationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/std/v1/decline/${applicationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to decline the application");
      } else {
        console.log("deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Grid2 container spacing={3}>
        {applications.map((application) => {
          const isAccepted = application.status === "accepted";
          return (
            <Grid2
              size={{ xs: 12, sm: 6, md: 4 }}
              key={application.application_id}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  width: "100%",
                  height: "auto",
                  background: isAccepted ? "#eafaea" : "#fff5e6",
                  border: isAccepted ? "3px solid green" : "3px solid orange",
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
                    sx={{ textAlign: "left", fontSize: "1rem", mb: 1 }}
                  >
                    <strong>Application Date:</strong>{" "}
                    {new Date(
                      application.application_date
                    ).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "left", fontSize: "1rem", mb: 1 }}
                  >
                    <strong>Scholarship Deadline:</strong>{" "}
                    {new Date(application.deadline_date).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "left", fontSize: "1rem" }}
                  >
                    <strong>Documents:</strong>
                    <Button
                      href={application.download_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<DownloadIcon />}
                      sx={{ ml: 1 }}
                    >
                      DOWNLOAD
                    </Button>
                  </Typography>
                </CardContent>

                {!isAccepted && application.status === "pending" && (
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => handleAccept(application.application_id)}
                      startIcon={<ThumbUpIcon />}
                    >
                      Accept
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => handleDecline(application.application_id)}
                      startIcon={<ThumbDownIcon />}
                    >
                      Decline
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
};

export default GovApplicationsCards;
