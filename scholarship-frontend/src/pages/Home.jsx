import React from "react";
import { Link } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import {
  AppBar,
  Box,
  Grid2,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <style>
        {`
      body,html {
        
        padding :0;
        overflow:hidden;
      }
    `}
      </style>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
          padding: "0 20px",
          borderBottom: "2px solid #fff",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="large" edge="start" color="inherit">
              <SchoolIcon sx={{ fontSize: "36px", marginRight: 1 }} />
            </IconButton>
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
              Gradious Scholarships
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: isMobile ? "calc(100vh - 80px)" : "calc(100vh - 60px)",
          padding: isMobile ? 1 : 2,
          flexDirection: isMobile ? "column" : "row",
          overflow: "hidden",
        }}
        gap={isMobile ? 4 : 16}
        md={isMobile ? 0 : 2}
      >
        <Grid2
          size={{ xs: 12, md: 6 }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          component={Link}
          to="/login"
          state={{ role: "student" }}
          sx={{
            padding: 4,
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            color: "white",
            borderRadius: "16px",
            textDecoration: "none",
            boxShadow: 6,
            transition: "transform 0.3s ease",
            "&:hover": {
              boxShadow: 10,
              transform: "scale(1.03)",
            },
            width: isMobile ? "80%" : "auto",
            // minHeight:'100px'
          }}
        >
          <PersonRoundedIcon
            sx={{
              color: "white",
              height: isMobile ? "150px" : "200px",
              width: isMobile ? "150px" : "200px",
            }}
          />
          <Typography sx={{ textDecoration: "none", fontWeight: "bold" }}>
            Student
          </Typography>
        </Grid2>

        <Grid2
          size={{ xs: 12, md: 6 }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          component={Link}
          to="/login"
          state={{ role: "government" }}
          sx={{
            padding: 4,
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            color: "white",
            borderRadius: "16px",
            textDecoration: "none",
            boxShadow: 6,
            transition: "transform 0.3s ease",
            "&:hover": {
              boxShadow: 10,
              transform: "scale(1.03)",
            },
            width: isMobile ? "80%" : "auto",
            // minHeight:'100px'
          }}
        >
          <AccountBalanceRoundedIcon
            sx={{
              color: "white",
              height: isMobile ? "150px" : "200px",
              width: isMobile ? "150px" : "200px",
            }}
          />
          <Typography sx={{ textDecoration: "none", fontWeight: "bold" }}>
            Government
          </Typography>
        </Grid2>
      </Box>
    </>
  );
}
