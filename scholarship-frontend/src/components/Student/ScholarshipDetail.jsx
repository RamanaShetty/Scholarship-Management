import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  Grid2,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StudentNav from "./StudentNav.jsx";
import ApplicationRegistration from "./ApplicationRegistration.jsx";

const ScholarshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8080/api/scholarship/v1",
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch scholarships");
        }

        const data = await response.json();
        setScholarship(data.find((s) => s.scholarship_id === parseInt(id)));
      } catch (err) {
        console.log(err);
      }
    };
    fetchScholarships();
  }, [id]);

  if (!scholarship) {
    return <Typography variant="h6">Scholarship not found.</Typography>;
  }

  return (
    <Box>
      <StudentNav />

      <Grid2 container justifyContent="center">
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              marginBottom: 3,
              marginTop: "40px",
              background: "linear-gradient(45deg, #CDE8F5 30%, #f2fcfe 90%)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" gutterBottom>
                  {scholarship.program_name}
                </Typography>
                <KeyboardBackspace
                  sx={{
                    cursor: "pointer",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    fontSize: 30,
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  onClick={() => {
                    navigate("/student");
                  }}
                />
              </Box>

              <Divider sx={{ margin: "16px 0" }} />
              <Typography
                variant="body1"
                sx={{
                  marginBottom: 2,
                  background: "#F9FAF3",
                  padding: 2,
                  borderRadius: "6px",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                }}
              >
                {scholarship.description}
              </Typography>

              <Box sx={{ marginBottom: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  Benefits:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    background: "#F9FAF3",
                    padding: 2,
                    borderRadius: "6px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {scholarship.benefits}
                </Typography>
              </Box>

              <Box sx={{ marginBottom: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  Eligibility:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    background: "#F9FAF3",
                    padding: 2,
                    borderRadius: "6px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {scholarship.eligibility}
                </Typography>
              </Box>

              <Box sx={{ marginBottom: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  Required Documents:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    background: "#F9FAF3",
                    padding: 2,
                    borderRadius: "6px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {scholarship.required_documents}
                </Typography>
              </Box>

              <Box
                sx={{
                  marginBottom: 2,
                  textAlign: "right",
                  mt: 4,
                  paddingRight: "15px",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  Deadline:
                  <CalendarTodayIcon sx={{ fontSize: "15px" }} />{" "}
                  {scholarship.deadline}
                </Typography>
              </Box>
            </CardContent>

            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{
                  backgroundImage:
                    "linear-gradient(to right, #E55D87 0%, #5FC3E4 51%, #E55D87 100%)",
                  margin: "10px",
                  padding: "10px 35px",
                  textAlign: "center",
                  textTransform: "uppercase",
                  transition: "0.5s",
                  backgroundSize: "200% auto",
                  color: "white",
                  boxShadow: "0 0 20px #eee",
                  borderRadius: "10px",
                  display: "block",
                  fontSize: "18px",
                  fontWeight: "600",
                  "&:hover": {
                    backgroundPosition: "right center",
                    color: "#fff",
                    textDecoration: "none",
                  },
                }}
              >
                Apply
              </Button>
            </Box>
          </Card>
        </Grid2>
      </Grid2>

      {/* Modal for document upload */}
      <ApplicationRegistration
        open={open}
        handleClose={() => setOpen(false)}
        scholarship_id={scholarship.scholarship_id}
      />
    </Box>
  );
};

export default ScholarshipDetail;
