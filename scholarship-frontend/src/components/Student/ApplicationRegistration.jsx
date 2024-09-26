import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const steps = ["Student Details", "Academic Details", "Upload Documents"];

const ApplicationRegistration = ({ open, handleClose, scholarship_id }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [studentDetails, setStudentDetails] = useState({
    fullName: "",
    fatherName: "",
    email: "",
    phone: "",
    dob: "",
    aadhaarNo: "",
    caste: "",
  });

  const [academicDetails, setAcademicDetails] = useState({
    instituteName: "",
    instituteCode: "",
    cgpa: "",
  });

  const [documents, setDocuments] = useState({
    tenthMemo: null,
    twelthMemo: null,
    incomeCertificate: null,
    casteCertificate: null,
    bonafide: null,
  });

  const navigate = useNavigate();

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleApply = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    for (const key in studentDetails) {
      formData.append(key, studentDetails[key]);
    }
    for (const key in academicDetails) {
      formData.append(key, academicDetails[key]);
    }
    for (const key in documents) {
      formData.append(key, documents[key]);
    }
    formData.append("scholarship_id", scholarship_id);

    try {
      const response = await fetch("http://localhost:8080/api/std/v1/submit", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to apply for the scholarship");
      }
      alert("Application submitted successfully!");
      navigate("/student");
    } catch (error) {
      console.error(error);
      alert("Error submitting application.");
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              label="Full Name"
              name="fullName"
              value={studentDetails.fullName || ""}
              onChange={(e) =>
                setStudentDetails({
                  ...studentDetails,
                  fullName: e.target.value,
                })
              }
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Father's Name"
              name="fatherName"
              value={studentDetails.fatherName || ""}
              onChange={(e) =>
                setStudentDetails({
                  ...studentDetails,
                  fatherName: e.target.value,
                })
              }
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              value={studentDetails.email || ""}
              onChange={(e) =>
                setStudentDetails({ ...studentDetails, email: e.target.value })
              }
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Phone No"
              name="phone"
              value={studentDetails.phone || ""}
              onChange={(e) =>
                setStudentDetails({ ...studentDetails, phone: e.target.value })
              }
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={studentDetails.dob || ""}
              onChange={(e) =>
                setStudentDetails({ ...studentDetails, dob: e.target.value })
              }
              fullWidth
              required
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Aadhaar No"
              name="aadhaarNo"
              value={studentDetails.aadhaarNo || ""}
              onChange={(e) =>
                setStudentDetails({
                  ...studentDetails,
                  aadhaarNo: e.target.value,
                })
              }
              fullWidth
              required
              sx={{ mb: 2 }}
              inputProps={{ maxLength: 12 }}
            />
            <TextField
              label="Caste"
              name="caste"
              value={studentDetails.caste || ""}
              onChange={(e) =>
                setStudentDetails({ ...studentDetails, caste: e.target.value })
              }
              fullWidth
              required
              sx={{ mb: 2 }}
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField
              label="Institute Name"
              name="instituteName"
              value={academicDetails.instituteName || ""}
              onChange={(e) =>
                setAcademicDetails({
                  ...academicDetails,
                  instituteName: e.target.value,
                })
              }
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Institute Code"
              name="instituteCode"
              value={academicDetails.instituteCode || ""}
              onChange={(e) =>
                setAcademicDetails({
                  ...academicDetails,
                  instituteCode: e.target.value,
                })
              }
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="CGPA"
              name="cgpa"
              value={academicDetails.cgpa || ""}
              onChange={(e) =>
                setAcademicDetails({ ...academicDetails, cgpa: e.target.value })
              }
              fullWidth
              required
              sx={{ mb: 2 }}
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Upload Documents
            </Typography>

            <Box sx={{ marginBottom: "16px" }}>
              <Typography variant="body1" gutterBottom>
                10th Memo
              </Typography>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ textTransform: "none" }}
              >
                Upload 10th Memo
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setDocuments({ ...documents, tenthMemo: e.target.files[0] })
                  }
                />
              </Button>
            </Box>

            <Box sx={{ marginBottom: "16px" }}>
              <Typography variant="body1" gutterBottom>
                12th Memo
              </Typography>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ textTransform: "none" }}
              >
                Upload 12th Memo
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setDocuments({
                      ...documents,
                      twelthMemo: e.target.files[0],
                    })
                  }
                />
              </Button>
            </Box>

            <Box sx={{ marginBottom: "16px" }}>
              <Typography variant="body1" gutterBottom>
                Income Certificate
              </Typography>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ textTransform: "none" }}
              >
                Upload Income Certificate
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setDocuments({
                      ...documents,
                      incomeCertificate: e.target.files[0],
                    })
                  }
                />
              </Button>
            </Box>

            <Box sx={{ marginBottom: "16px" }}>
              <Typography variant="body1" gutterBottom>
                Caste Certificate
              </Typography>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ textTransform: "none" }}
              >
                Upload Caste Certificate
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setDocuments({
                      ...documents,
                      casteCertificate: e.target.files[0],
                    })
                  }
                />
              </Button>
            </Box>

            <Box sx={{ marginBottom: "16px" }}>
              <Typography variant="body1" gutterBottom>
                Bonafide Certificate
              </Typography>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ textTransform: "none" }}
              >
                Upload Bonafide Certificate
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setDocuments({ ...documents, bonafide: e.target.files[0] })
                  }
                />
              </Button>
            </Box>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Scholarship Application</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 3 }}>{renderStepContent(activeStep)}</Box>
      </DialogContent>
      <DialogActions>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleApply} color="primary" variant="contained">
            Submit
          </Button>
        ) : (
          <Button onClick={handleNext} color="primary" variant="contained">
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ApplicationRegistration;
