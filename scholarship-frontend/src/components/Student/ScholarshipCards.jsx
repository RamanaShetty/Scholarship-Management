import React, { useState, useEffect } from "react";
import {
  Grid2,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ScholarshipsPerPage = 9;

const ScholarshipCards = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [scholarships, setScholarships] = useState([]);

  const totalPages = Math.ceil(scholarships.length / ScholarshipsPerPage);

  const displayedScholarships = scholarships.slice(
    (currentPage - 1) * ScholarshipsPerPage,
    currentPage * ScholarshipsPerPage
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

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
        setScholarships(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchScholarships();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Available Scholarships
      </Typography>
      <Grid2 container spacing={4} justifyContent="center">
        {displayedScholarships.map((scholarship) => (
          <Grid2
            size={{ xs: 12, sm: 6, md: 4 }}
            key={scholarship.scholarship_id}
          >
            <Card
              onClick={() =>
                navigate(`/scholarship/${scholarship.scholarship_id}`)
              }
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
                  background: "#1976d2",
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
                  {scholarship.program_name}
                </Typography>
              </CardContent>
              <CardContent sx={{ padding: 2, textAlign: "left" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 1 }}
                >
                  {scholarship.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 1, fontWeight: "bold" }}
                >
                  Benefits:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {scholarship.benefits}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: 2, fontWeight: "bold" }}
                >
                  Deadline:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {scholarship.deadline.split("T")[0]}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  justifyContent: "center",
                  padding: "16px",
                  background: "rgba(0, 0, 0, 0.03)",
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    backgroundColor: "#42a5f5",
                    color: "#ffffff",
                    fontWeight: "bold",
                    padding: "8px 16px",
                    borderRadius: 20,
                    textTransform: "none",
                    boxShadow: "0 3px 5px rgba(0, 0, 0, 0.15)",
                    "&:hover": {
                      backgroundColor: "#1976d2",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  Check Out
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ScholarshipCards;
