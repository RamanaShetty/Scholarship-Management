// ScholarshipForm.js
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const ScholarshipForm = ({ open, handleClose }) => {
  const [programName, setProgramName] = useState("");
  const [description, setDescription] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [benefits, setBenefits] = useState("");
  const [deadline, setDeadline] = useState("");
  const [requiredDocuments, setRequiredDocuments] = useState("");

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

      handleClose();

      navigate("/gov");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
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
  );
};

export default ScholarshipForm;
