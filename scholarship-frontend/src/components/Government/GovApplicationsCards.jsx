import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import ContactPageIcon from "@mui/icons-material/ContactPage";

const GovApplicationsCards = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [scholarshipFilter, setScholarshipFilter] = useState("");
  const [instituteFilter, setInstituteFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [castFilter, setCastFilter] = useState("");
  const navigate = useNavigate();

  const scholarshipNames = [
    "National Merit Scholarship",
    "Community Service Scholarship",
    "STEM Excellence Scholarship",
    "Artistic Achievement Scholarship",
    "Diversity and Inclusion Scholarship",
    "International Student Scholarship",
    "Future Leaders Scholarship",
    "Science and Technology Scholarship",
    "Education for All Scholarship",
    "Women's Empowerment Scholarship",
    "Green Future Scholarship",
    "Innovation in Technology Scholarship",
  ];
  const instituteNames = [
    "CMR College of Engineering and Technology",
    "CMR Engineering College",
    "CMR Technical College",
    "CMR Institute of Technology",
    "Chaitanya Bharati Institute of Technology",
    "Keshav Memorial Institute of Technology",
  ];
  const statuses = ["accepted", "pending"];
  const castes = ["General", "OBC", "SC", "ST"];

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
        setFilteredApplications(data); // Initialize filteredApplications
      } catch (err) {
        console.log(err);
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    let filtered = applications;

    if (scholarshipFilter) {
      filtered = filtered.filter(
        (app) => app.program_name === scholarshipFilter
      );
    }

    if (instituteFilter) {
      filtered = filtered.filter(
        (app) => app.institute_name === instituteFilter
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    if (castFilter) {
      filtered = filtered.filter((app) => app.caste === castFilter);
    }

    setFilteredApplications(filtered);
  }, [
    scholarshipFilter,
    instituteFilter,
    statusFilter,
    castFilter,
    applications,
  ]);

  const handleCardClick = (application) => {
    navigate(`/gov/applications/${application.application_id}`, {
      state: { application },
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Filter section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          marginBottom: 4,
          padding: 2,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <FormControl fullWidth sx={{ minWidth: 120 }}>
          <InputLabel id="scholarship-label">Scholarship</InputLabel>
          <Select
            labelId="scholarship-label"
            value={scholarshipFilter}
            onChange={(e) => setScholarshipFilter(e.target.value)}
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          >
            <MenuItem value="">All</MenuItem>
            {scholarshipNames.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ minWidth: 120 }}>
          <InputLabel id="institute-label">Institute</InputLabel>
          <Select
            labelId="institute-label"
            value={instituteFilter}
            onChange={(e) => setInstituteFilter(e.target.value)}
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          >
            <MenuItem value="">All</MenuItem>
            {instituteNames.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}{" "}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ minWidth: 120 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          >
            <MenuItem value="">All</MenuItem>
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}{" "}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ minWidth: 120 }}>
          <InputLabel id="cast-label">Caste</InputLabel>
          <Select
            labelId="cast-label"
            value={castFilter}
            onChange={(e) => setCastFilter(e.target.value)}
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          >
            <MenuItem value="">All</MenuItem>
            {castes.map((cast) => (
              <MenuItem key={cast} value={cast}>
                {cast}
              </MenuItem>
            ))}{" "}
          </Select>
        </FormControl>
      </Box>

      {/* Application cards */}
      <Grid container spacing={3}>
        {filteredApplications.map((application) => (
          <Grid item xs={12} sm={6} md={4} key={application.application_id}>
            <Card
              onClick={() => handleCardClick(application)}
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                width: "100%",
                height: "auto",
                background:
                  application.status === "accepted" ? "#E0FBE2" : "#fff5e6",
                border:
                  application.status === "accepted"
                    ? "3px solid green"
                    : "3px solid orange",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <ContactPageIcon sx={{ mr: 1 }} /> {/* Added the icon here */}
                  <Typography variant="h6" sx={{ fontSize: "18px" }}>
                    {application.program_name}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 1 }} />
                {/* Student Name */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "text.secondary", mr: 1 }}
                  >
                    Student:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {application.student_name}
                  </Typography>
                </Box>

                {/* Institute Name */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "text.secondary", mr: 1 }}
                  >
                    Institute:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {application.institute_name}
                  </Typography>
                </Box>

                {/* Status */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "text.secondary", mr: 1 }}
                  >
                    Status:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {application.status}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <Button
                    size="small"
                    startIcon={<ReadMoreIcon />}
                    onClick={() => handleCardClick(application.application_id)}
                  >
                    View More
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GovApplicationsCards;
