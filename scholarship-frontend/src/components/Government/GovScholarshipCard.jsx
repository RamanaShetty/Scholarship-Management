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
  Snackbar, // Add Snackbar
  Alert, // Add Alert for styled snackbar message
  Dialog,
} from "@mui/material";
import ScholarshipForm from "./ScholarshipForm";
import EditScholarshipForm from "./EditScholarship";

const ScholarshipsPerPage = 9;

const GovScholarshipCards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [scholarships, setScholarships] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editScholarship, setEditScholarship] = useState({
    program_name: "",
    description: "",
    eligibility: "",
    benefits: "",
    deadline: "",
    required_documents: "",
  });
  const [error, setError] = useState(""); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // You can switch between 'success' or 'error'

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
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch scholarships");
        }

        const data = await response.json();
        setScholarships(data);
      } catch (err) {
        setError(err.message); 
        console.error(err);
      }
    };

    fetchScholarships();
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true); // Open the snackbar with message and severity
  };

  const handleDelete = async (scholarshipId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/scholarship/v1/${scholarshipId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete scholarship");
      }

      setScholarships((prevScholarships) =>
        prevScholarships.filter(
          (scholarship) => scholarship.scholarship_id !== scholarshipId
        )
      );

      showSnackbar("Scholarship deleted successfully"); // Show success snackbar
    } catch (err) {
      setError(err.message);
      showSnackbar("Failed to delete scholarship", "error"); // Show error snackbar
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {error && <Typography color="error">{error}</Typography>} 
      
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenForm(true)}
        >
          Add
        </Button>
      </Box>

      <Grid2 container spacing={4} justifyContent="center">
        {displayedScholarships.map((scholarship) => (
          <Grid2
            size={{ xs: 12, sm: 6, md: 4 }}
            key={scholarship.scholarship_id}
          >
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
                  {scholarship.deadline}
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
                  onClick={() => {
                    setEditScholarship(scholarship);
                    setOpenEditModal(true);
                  }}
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
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(scholarship.scholarship_id)}
                  sx={{
                    marginLeft: 1,
                    fontWeight: "bold",
                    padding: "8px 16px",
                    borderRadius: 20,
                    textTransform: "none",
                    boxShadow: "0 3px 5px rgba(0, 0, 0, 0.15)",
                    "&:hover": {
                      backgroundColor: "#d32f2f",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  Delete
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

      <ScholarshipForm open={openForm} handleClose={() => setOpenForm(false)} />

      {/* Edit Modal */}
      <EditScholarshipForm
        openEditModal={openEditModal}
        handleEditClose={() => setOpenEditModal(false)}
        data={editScholarship}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000} // Auto-hide after 4 seconds
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Centered at the top
      >
        <Alert
          severity={snackbarSeverity} // success or error
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default GovScholarshipCards;
