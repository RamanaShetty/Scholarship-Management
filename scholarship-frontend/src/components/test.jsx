import React, { useState } from "react";
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
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FilterListIcon from "@mui/icons-material/FilterList"; // Importing filter icon

const GovApplicationsCards = () => {
  const sampleApplications = [
    {
      application_id: 1,
      program_name: "Scholarship for Excellence",
      student_name: "Alice Johnson",
      institute_name: "University of Knowledge",
      application_date: "2024-09-01",
      deadline_date: "2024-10-15",
      download_link: "#",
      status: "pending",
      age: 20,
    },
    {
      application_id: 2,
      program_name: "Need-Based Scholarship",
      student_name: "Bob Smith",
      institute_name: "Institute of Technology",
      application_date: "2024-09-02",
      deadline_date: "2024-10-20",
      download_link: "#",
      status: "accepted",
      age: 22,
    },
    {
      application_id: 3,
      program_name: "Merit Scholarship",
      student_name: "Charlie Brown",
      institute_name: "Community College",
      application_date: "2024-09-05",
      deadline_date: "2024-10-25",
      download_link: "#",
      status: "pending",
      age: 19,
    },
    {
      application_id: 4,
      program_name: "Sports Scholarship",
      student_name: "Diana Prince",
      institute_name: "National Sports Academy",
      application_date: "2024-09-10",
      deadline_date: "2024-11-01",
      download_link: "#",
      status: "pending",
      age: 21,
    },
    {
      application_id: 5,
      program_name: "Art Scholarship",
      student_name: "Ethan Hunt",
      institute_name: "School of Arts",
      application_date: "2024-09-12",
      deadline_date: "2024-11-15",
      download_link: "#",
      status: "pending",
      age: 18,
    },
  ];

  const [applications, setApplications] = useState(sampleApplications);
  const [statusFilter, setStatusFilter] = useState("");
  const [instituteFilter, setInstituteFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [scholarshipFilter, setScholarshipFilter] = useState("");

  const handleAccept = (applicationId) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.application_id === applicationId
          ? { ...app, status: "accepted" }
          : app
      )
    );
  };

  const handleDecline = (applicationId) => {
    setApplications((prev) =>
      prev.filter((app) => app.application_id !== applicationId)
    );
  };

  const filteredApplications = applications.filter((application) => {
    const isInAgeRange = () => {
      if (!ageFilter) return true;
      const age = application.age;
      switch (ageFilter) {
        case "under10":
          return age < 10;
        case "10to19":
          return age >= 10 && age <= 19;
        case "20to29":
          return age >= 20 && age <= 29;
        case "30to39":
          return age >= 30 && age <= 39;
        case "40to49":
          return age >= 40 && age <= 49;
        case "50to59":
          return age >= 50 && age <= 59;
        case "60plus":
          return age >= 60;
        default:
          return true;
      }
    };

    return (
      (statusFilter ? application.status === statusFilter : true) &&
      (instituteFilter
        ? application.institute_name === instituteFilter
        : true) &&
      (scholarshipFilter
        ? application.program_name === scholarshipFilter
        : true) &&
      isInAgeRange()
    );
  });

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FilterListIcon sx={{ marginRight: 1 }} />{" "}
            {/* Icon and text on the same line */}
            Filters
          </Box>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FormControl fullWidth sx={{ minWidth: 150 }}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="accepted">Accepted</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth sx={{ minWidth: 150 }}>
              <InputLabel id="scholarship-label">Scholarship Name</InputLabel>
              <Select
                labelId="scholarship-label"
                value={scholarshipFilter}
                onChange={(e) => setScholarshipFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Scholarship for Excellence">
                  Scholarship for Excellence
                </MenuItem>
                <MenuItem value="Need-Based Scholarship">
                  Need-Based Scholarship
                </MenuItem>
                <MenuItem value="Merit Scholarship">Merit Scholarship</MenuItem>
                <MenuItem value="Sports Scholarship">
                  Sports Scholarship
                </MenuItem>
                <MenuItem value="Art Scholarship">Art Scholarship</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth sx={{ minWidth: 150 }}>
              <InputLabel id="institute-label">Institute Name</InputLabel>
              <Select
                labelId="institute-label"
                value={instituteFilter}
                onChange={(e) => setInstituteFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="University of Knowledge">
                  University of Knowledge
                </MenuItem>
                <MenuItem value="Institute of Technology">
                  Institute of Technology
                </MenuItem>
                <MenuItem value="Community College">Community College</MenuItem>
                <MenuItem value="National Sports Academy">
                  National Sports Academy
                </MenuItem>
                <MenuItem value="School of Arts">School of Arts</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth sx={{ minWidth: 150 }}>
              <InputLabel id="age-label">Age Group</InputLabel>
              <Select
                labelId="age-label"
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="under10">Under 10</MenuItem>
                <MenuItem value="10to19">10 - 19</MenuItem>
                <MenuItem value="20to29">20 - 29</MenuItem>
                <MenuItem value="30to39">30 - 39</MenuItem>
                <MenuItem value="40to49">40 - 49</MenuItem>
                <MenuItem value="50to59">50 - 59</MenuItem>
                <MenuItem value="60plus">60 and above</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {filteredApplications.map((application) => {
          const isAccepted = application.status === "accepted";
          return (
            <Grid item xs={12} sm={6} md={4} key={application.application_id}>
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
                    sx={{ fontSize: "18px" }}
                  >
                    {application.program_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1.5, color: "text.secondary" }}
                  >
                    Student: {application.student_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1.5, color: "text.secondary" }}
                  >
                    Institute: {application.institute_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1.5, color: "text.secondary" }}
                  >
                    Application Date: {application.application_date}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1.5, color: "text.secondary" }}
                  >
                    Deadline: {application.deadline_date}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DownloadIcon />}
                    href={application.download_link}
                  >
                    Download
                  </Button>
                  {application.status === "pending" && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<ThumbUpIcon />}
                        onClick={() => handleAccept(application.application_id)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<ThumbDownIcon />}
                        onClick={() =>
                          handleDecline(application.application_id)
                        }
                      >
                        Decline
                      </Button>
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default GovApplicationsCards;
