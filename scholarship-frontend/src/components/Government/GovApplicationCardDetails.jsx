import React, { useState } from "react";
import GovNavbar from "./GovNav";
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Divider,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const GovApplicationCardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const applicationDetails = location.state?.application;

  const [open, setOpen] = useState(false);

  const handleOnclickBtn = () => {
    setOpen(true);
  };

  const handleOnclickClose = () => {
    setOpen(false);
  };

  if (!applicationDetails) {
    return <Typography>Loading...</Typography>;
  }

  const handleAccept = async (applicationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/std/v1/approve/${applicationId}`, // Use backticks for string interpolation
        {
          method: "PUT",
          headers: {
            Authorization: `${token}`, // Added Bearer prefix
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
        `http://localhost:8080/api/std/v1/decline/${applicationId}`, // Use backticks for string interpolation
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`, // Added Bearer prefix
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
      <Box sx={{ height: "100vh" }}>
        <Container
          sx={{
            mt: 8,
            padding: 4,
            background: "linear-gradient(45deg, #CDE8F5 30%, #f2fcfe 90%)",
            borderRadius: "20px",
            width: "1000px",
          }}
        >
          <Box display={"flex"} alignItems={"center"}>
            <Button onClick={() => navigate("/gov/applications")}>
              <KeyboardBackspaceIcon
                sx={{ width: "40px", height: "40px", color: "black" }}
              />
            </Button>
            <Typography
              textAlign={"center"}
              fontSize={30}
              fontWeight={800}
              sx={{ ml: "300px" }}
              variant="h5"
              gutterBottom
            >
              Application Details
            </Typography>
          </Box>
          <Divider />
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Caste:</strong> {applicationDetails.caste}
              </Typography>
              <Typography variant="body1">
                <strong>Institute Name:</strong>{" "}
                {applicationDetails.institute_name}
              </Typography>
              <Typography variant="body1">
                <strong>Institute Code:</strong>{" "}
                {applicationDetails.institute_code}
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
            </Grid>
          </Grid>

          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Button onClick={handleOnclickBtn}>
              <DownloadIcon sx={{ mr: 2 }} /> Documents
            </Button>
          </Box>

          {/* Accept and Decline Buttons */}
          {applicationDetails.status === "pending" && (
            <Box
              sx={{ mt: 3 }}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: "#66bb6a", mr: 2, fontWeight: 700 }}
                onClick={() => handleAccept(applicationDetails.application_id)}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "lightCoral", fontWeight: 700 }}
                onClick={() => handleDecline(applicationDetails.application_id)}
              >
                Decline
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      <Dialog open={open} onClose={handleOnclickClose}>
        <DialogContent>
          <Box display={"flex"} flexDirection={"column"} sx={{ mt: 2 }}>
            {applicationDetails.documents.tenth_memo && (
              <Button
                variant="contained"
                href={applicationDetails.documents.tenth_memo}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mt: 1, mr: 1 }}
              >
                <CloudDownloadIcon sx={{ mr: 2 }} />
                Tenth Memo
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
                <CloudDownloadIcon sx={{ mr: 2 }} />
                Twelth Memo
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
                <CloudDownloadIcon sx={{ mr: 2 }} />
                Income Certificate
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
                <CloudDownloadIcon sx={{ mr: 2 }} />
                Caste Certificate
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
                <CloudDownloadIcon sx={{ mr: 2 }} />
                Bonafide Certificate
              </Button>
            )}
            <Button onClick={handleOnclickClose} sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GovApplicationCardDetails;
