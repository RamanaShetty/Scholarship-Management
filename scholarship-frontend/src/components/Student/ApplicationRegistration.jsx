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
  Snackbar,
  Alert
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

  const [validationErrors, setValidationErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [documents, setDocuments] = useState({
    tenthMemo: null,
    twelthMemo: null,
    incomeCertificate: null,
    casteCertificate: null,
    bonafide: null,
  });



  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const validation = () => {

    const errors = {};

    if (activeStep == 0) {
      if (!studentDetails.fullName.trim()) {
        console.log("full name is required");
        errors.fullName = "full name is required";
      }
      if (!studentDetails.fatherName.trim()) {
        console.log('father name is required');
        errors.fatherName = "father name is required";
      }

      if (!studentDetails.email.trim()) {
        console.log('email is required');
        errors.email = "email is required";
      }
      else if (!/\S+@\S+\.\S+/.test(studentDetails.email)) {
        console.log('invalid email');
        errors.email = 'invalid email';
      }

      if (!studentDetails.phone.trim()) {
        console.log('Phone is required');
        errors.phone = "phone is required";
      }
      else if (!/^\d{10}$/.test(studentDetails.phone)) {
        console.log('invalid phone number');
        errors.email = 'invalid phone number';
      }

      if (!studentDetails.dob.trim()) {
        console.log('Date of birth is required');
        errors.dob = "Date of birth is required";
      }

      if (!studentDetails.aadhaarNo.trim()) {
        console.log('AadhaarNo is required');
        errors.aadhaarNo = "AadhaarNo is required";
      } else if (!/^\d{12}$/.test(studentDetails.aadhaarNo)) {
        console.log('Aadhaar Number must be 12 digits');
        errors.aadhaarNo = "Aadhaar Number must be 12 digits";
      }

      if (!studentDetails.caste.trim()) {
        console.log('AadhaarNo is required');
        errors.caste = "AadhaarNo is required";
      }

    }

    else if (activeStep === 1) {
      // Academic Details Validation
      if (!academicDetails.instituteName.trim()) {
        errors.instituteName = "Institute Name is required";
      }

      if (!academicDetails.instituteCode.trim()) {
        errors.instituteCode = "Institute Code is required";
      }

      if (!academicDetails.cgpa.trim()) {
        errors.cgpa = "CGPA is required";
      } else if (isNaN(academicDetails.cgpa) || academicDetails.cgpa < 0) {
        errors.cgpa = "CGPA must be a positive number";
      }
    }

    else if (activeStep === 2) {
      // Documents Validation
      if (!documents.tenthMemo) {
        errors.tenthMemo = "10th Memo is required";
      }

      if (!documents.twelthMemo) {
        errors.twelthMemo = "12th Memo is required";
      }

      if (!documents.incomeCertificate) {
        errors.incomeCertificate = "Income Certificate is required";
      }

      if (!documents.casteCertificate) {
        errors.casteCertificate = "Caste Certificate is required";
      }

      if (!documents.bonafide) {
        errors.bonafide = "Bonafide Certificate is required";
      }
    }

    setValidationErrors(errors);

    // Return true if no errors
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      // Show Snackbar with error message
      setSnackbarSeverity("error");
      setSnackbarMessage("please check and fill your details");
      setSnackbarOpen(true);
      return false;
    }
  }

  const handleNext = () => {
    if (validation()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }

  const handleBack = () => {
    setValidationErrors({});
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  const handleApply = async () => {

    if (!validation()) return; 
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
      setSnackbarSeverity("success");
    setSnackbarMessage("Application submitted successfully!");
    setSnackbarOpen(true);
    
    // Redirect after a short delay (optional)
    setTimeout(() => {
      navigate("/student");
    }, 2000);
    } catch (error) {
      console.error(error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Error submitting application.");
      setSnackbarOpen(true);
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: 'top', // or 'top'
          horizontal: 'center', // or 'left', 'right'
        }}
        onClose={handleSnackbarClose}
      >
        <Alert  severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default ApplicationRegistration;