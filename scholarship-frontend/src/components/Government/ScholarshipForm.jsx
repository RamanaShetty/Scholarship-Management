import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Snackbar,
  Alert, // Import Alert for Snackbar
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ScholarshipForm = ({ open, handleClose }) => {
  const [programName, setProgramName] = useState("");
  const [description, setDescription] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [benefits, setBenefits] = useState("");
  const [deadline, setDeadline] = useState("");
  const [requiredDocuments, setRequiredDocuments] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const scholarshipData = {
      program_name: programName,
      description,
      eligibility,
      benefits,
      deadline,
      required_documents: requiredDocuments,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/gov/v1/scholarship",
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(scholarshipData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create scholarship");
      }

      console.log("Scholarship created successfully!");
      setProgramName("");
      setDescription("");
      setEligibility("");
      setBenefits("");
      setDeadline("");
      setRequiredDocuments("");

      setSnackbarMessage("Scholarship added successfully!"); // Set success message
      setSnackbarOpen(true); // Open Snackbar

      handleClose();

      navigate("/gov");
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Failed to add scholarship."); // Set error message
      setSnackbarOpen(true); // Open Snackbar
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Scholarship</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Program Name"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              required
              multiline
              rows={4}
            />
            <TextField
              label="Eligibility"
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Benefits"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toISOString().split("T")[0],
              }}
            />
            <TextField
              label="Required Documents"
              value={requiredDocuments}
              onChange={(e) => setRequiredDocuments(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

          {/* Snackbar for feedback */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Center at the top
          >
            <Alert severity="success" sx={{ width: '100%' }} onClose={undefined}> {/* Remove onClose prop for the cross button */}
              {snackbarMessage}
            </Alert>
          </Snackbar>
    </>
  );
};

export default ScholarshipForm;
