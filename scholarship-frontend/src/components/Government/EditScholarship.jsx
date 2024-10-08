// ScholarshipForm.js
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const EditScholarshipForm = ({ openEditModal, handleEditClose, data }) => {
  const [editScholarship, setEditScholarship] = useState(data);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const navigate = useNavigate();

  useEffect(() => {
    setEditScholarship(data);
  }, [data]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditScholarship((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/scholarship/v1/${editScholarship.scholarship_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editScholarship),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update scholarship");
      }

      console.log("ok ok");
      handleEditClose();
      setSnackbarMessage("Scholarship details updated successfully!"); // Set success message
      setSnackbarOpen(true); // Open Snackbar

      navigate("/gov");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={openEditModal} onClose={handleEditClose}>
        <DialogTitle>Edit Scholarship</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSubmit}>
            <TextField
              label="Program Name"
              name="program_name"
              value={editScholarship.program_name}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              name="description"
              value={editScholarship.description}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
              required
              multiline
              rows={4}
            />
            <TextField
              label="Eligibility"
              name="eligibility"
              value={editScholarship.eligibility}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Benefits"
              name="benefits"
              value={editScholarship.benefits}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Deadline"
              name="deadline"
              type="date"
              value={editScholarship.deadline.split("T")[0]}
              onChange={handleEditChange}
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
              name="required_documents"
              value={editScholarship.required_documents}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
              required
            />
            <DialogActions>
              <Button onClick={handleEditClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Positioning at the top center
        >
        <Alert severity="success" sx={{ width: '100%' }} onClose={undefined}> {/* Remove onClose prop for the cross button */}
              {snackbarMessage}
            </Alert>
      </Snackbar>
    </>
  );
};

export default EditScholarshipForm;
