//GovApplicationCardDetails
import React from "react";
import GovNavbar from "./GovNav";
import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const GovApplicationCardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const applicationDetails = location.state?.application;

  if (!applicationDetails) {
    return <Typography>Loading...</Typography>;
  }

  const handleAccept = async (applicationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/std/v1/approve/${applicationId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept the application");
      } else {
        console.log("accepted");
        navigate("/gov/applications");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async (applicationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/std/v1/decline/${applicationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to decline the application");
      } else {
        console.log("deleted");
        navigate("/gov/applications");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <GovNavbar />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Application Details
        </Typography>
        <Typography variant="body1">
          <strong>Program Name:</strong> {applicationDetails.program_name}
        </Typography>
        <Typography variant="body1">
          <strong>Student Name:</strong> {applicationDetails.student_name}
        </Typography>
        <Typography variant="body1">
          <strong>Father Name:</strong> {applicationDetails.father_name}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {applicationDetails.email}
        </Typography>
        <Typography variant="body1">
          <strong>Phone:</strong> {applicationDetails.phone}
        </Typography>
        <Typography variant="body1">
          <strong>Date of Birth:</strong>{" "}
          {new Date(applicationDetails.dob).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          <strong>Aadhaar No:</strong> {applicationDetails.aadhaar_no}
        </Typography>
        <Typography variant="body1">
          <strong>Caste:</strong> {applicationDetails.caste}
        </Typography>
        <Typography variant="body1">
          <strong>Institute Name:</strong> {applicationDetails.institute_name}
        </Typography>
        <Typography variant="body1">
          <strong>Institute Code:</strong> {applicationDetails.institute_code}
        </Typography>
        <Typography variant="body1">
          <strong>CGPA:</strong> {applicationDetails.cgpa}
        </Typography>
        <Typography variant="body1">
          <strong>Application Date:</strong>{" "}
          {new Date(applicationDetails.application_date).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong> {applicationDetails.status}
        </Typography>
        <Typography variant="body1">
          <strong>Scholarship Deadline:</strong>{" "}
          {new Date(applicationDetails.deadline).toLocaleDateString()}
        </Typography>

        {/* Download Document Section */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Documents</Typography>
          {applicationDetails.documents.tenth_memo && (
            <Button
              variant="contained"
              href={applicationDetails.documents.tenth_memo}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 1, mr: 1 }}
            >
              Download Tenth Memo
            </Button>
          )}
          {applicationDetails.documents.twelth_memo && (
            <Button
              variant="contained"
              href={applicationDetails.documents.twelth_memo}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 1, mr: 1 }}
            >
              Download Twelth Memo
            </Button>
          )}
          {applicationDetails.documents.income_certificate && (
            <Button
              variant="contained"
              href={applicationDetails.documents.income_certificate}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 1, mr: 1 }}
            >
              Download Income Certificate
            </Button>
          )}
          {applicationDetails.documents.caste_certificate && (
            <Button
              variant="contained"
              href={applicationDetails.documents.caste_certificate}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 1, mr: 1 }}
            >
              Download Caste Certificate
            </Button>
          )}
          {applicationDetails.documents.bonafide && (
            <Button
              variant="contained"
              href={applicationDetails.documents.bonafide}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 1, mr: 1 }}
            >
              Download Bonafide Certificate
            </Button>
          )}
        </Box>

        {/* Accept and Decline Buttons */}
        {applicationDetails.status === "pending" && (
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleAccept(applicationDetails.application_id)}
              sx={{ mr: 2 }}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDecline(applicationDetails.application_id)}
            >
              Decline
            </Button>
          </Box>
        )}

        <Button
          variant="contained"
          onClick={() => window.history.back()}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Box>
    </>
  );
};

export default GovApplicationCardDetails;
