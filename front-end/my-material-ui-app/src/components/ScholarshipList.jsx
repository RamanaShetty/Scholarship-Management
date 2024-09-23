import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Paper, Divider, Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel, Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';

// Scholarship data
const scholarshipsData = {
    liveScholarships: [
        {
            id: 1,
            title: "SBIF ASHA SCHOLARSHIP PROGRAM FOR SCHOOL STUDENTS",
            award: "INR 15,000 each",
            eligibility: "For class 6 to 12 students",
            daysLeft: "8 days to go"
        },
        {
            id: 2,
            title: "BUDDY4STUDY - ICICI BANK DOMESTIC EDUCATION LOAN PROGRAMME",
            award: "Loan up to INR 1 crore",
            eligibility: "For undergraduate, postgraduate students in India",
            daysLeft: "15 days to go"
        },
        {
            id: 3,
            title: "SOF-INTERNATIONAL GENERAL KNOWLEDGE OLYMPIAD (IGKO) 2024-25",
            award: "Up to 50,000 and other benefits",
            eligibility: "Class 1 to 10 students",
            daysLeft: "22 days to go"
        },
        {
            id: 4,
            title: "KOTAK KANYA SCHOLARSHIP 2024-25",
            award: "INR 1.5 lakh* per year",
            eligibility: "Meritorious girls in the first year of graduation programs",
            daysLeft: "30 days to go"
        },
        {
            id: 5,
            title: "CHEVENING SCHOLARSHIPS 2025-26",
            award: "A fully-funded scholarship for the course for a year and other benefits",
            eligibility: "Students pursuing a master's degree in the UK",
            daysLeft: "40 days to go"
        }
    ],
    upcomingScholarships: [
        {
            id: 6,
            title: "COMMONWEALTH SHARED SCHOLARSHIPS 2024-25",
            award: "A monthly stipend up to £1,652, tuition fees, and other benefits",
            eligibility: "Postgraduate applicants",
            daysLeft: "21-11-2024"
        },
        {
            id: 7,
            title: "NORTH SOUTH FOUNDATION (NSF) SCHOLARSHIP 2024-25",
            award: "Up to INR 30,000 per annum",
            eligibility: "Class 12 passed students",
            daysLeft: "25-12-2024"
        },
        {
            id: 8,
            title: "BABA SINGH SCHOLARSHIP SCHEME 2024-25",
            award: "INR 50,000 per annum or tuition/annual fees",
            eligibility: "Students pursuing diploma in Engineering or degree",
            daysLeft: "31-12-2024"
        },
    ],
    alwaysOpenScholarships: [
        {
            id: 9,
            title: "KALINGA SIKHYA SATHI YOJANA",
            award: "Education loan up to ₹10,00,000",
            eligibility: "Students of Odisha"
        },
        {
            id: 10,
            title: "INDIAN BANK EDUCATION LOAN (IBA)",
            award: "Loan ranging from INR 4 lakh to INR 25 lakh and other benefits",
            eligibility: "UG, PG and PG diploma students"
        },
        {
            id: 11,
            title: "MHI EXCELLENCE SCHOLARSHIP 2024",
            award: "A tuition fee discount of up to £5,000",
            eligibility: "Students admitted to postgraduate courses at the University of Manchester"
        }
    ]
};

const ScholarshipList = () => {
    const [selectedTab, setSelectedTab] = useState("live"); // 'live', 'upcoming', 'alwaysOpen'

    const renderScholarships = (scholarshipType) => {
        let scholarships;

        if (scholarshipType === "live") {
            scholarships = scholarshipsData.liveScholarships;
        } else if (scholarshipType === "upcoming") {
            scholarships = scholarshipsData.upcomingScholarships;
        } else {
            scholarships = scholarshipsData.alwaysOpenScholarships;
        }

        return scholarships.map((scholarship) => (
            <Grid item xs={12} sm={6} md={4} key={scholarship.id}>
                <Link to={`/scholarship/${scholarship.id}`} style={{ textDecoration: 'none' }}>
                    <Card style={{
                        height: '250px',
                        borderRadius: '10px',
                        fontFamily: 'Roboto, sans-serif',
                        backgroundColor: '#E6E6FA'
                    }}>
                        <CardContent style={{ backgroundColor: '#d8bfd8', padding: '15px' }}>
                            <Typography variant="h6" component="div" style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#4b0082' }}>
                                {scholarship.title}
                            </Typography>
                            <Divider style={{ backgroundColor: '#4b0082', marginTop: '10px' }} />
                        </CardContent>

                        <CardContent style={{ padding: '15px', color: '#4b0082', textAlign: 'left' }}>
                            <Typography variant="body2" style={{ fontWeight: 'bold', display: 'inline' }}>
                                Award:
                            </Typography>
                            <Typography variant="body2" color="textSecondary" style={{ display: 'inline', marginLeft: '5px' }}>
                                {scholarship.award}
                            </Typography>
                            <br />
                            <Typography variant="body2" style={{ fontWeight: 'bold', display: 'inline' }}>
                                Eligibility:
                            </Typography>
                            <Typography variant="body2" color="textSecondary" style={{ display: 'inline', marginLeft: '5px' }}>
                                {scholarship.eligibility}
                            </Typography>
                            {scholarship.daysLeft && (
                                <>
                                    <br />
                                    <Typography variant="body2" style={{ fontWeight: 'bold', display: 'inline' }}>
                                        Deadline:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" style={{ display: 'inline', marginLeft: '5px' }}>
                                        {scholarship.daysLeft}
                                    </Typography>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Link>
            </Grid>
        ));
    };

    return (
        <Grid container spacing={2}>
            {/* Scholarship Tabs and Cards on the right */}
            <Grid item xs={12}>
                {/* Scholarship Tabs at the Top */}
                <ButtonGroup fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
                    <Button
                        style={{ color: selectedTab === "live" ? '#4b0082' : 'default' }}
                        onClick={() => setSelectedTab("live")}
                    >
                        Live Scholarships
                    </Button>
                    <Button
                        style={{ color: selectedTab === "upcoming" ? '#4b0082' : 'default' }}
                        onClick={() => setSelectedTab("upcoming")}
                    >
                        Upcoming Scholarships
                    </Button>
                    <Button
                        style={{ color: selectedTab === "alwaysOpen" ? '#4b0082' : 'default' }}
                        onClick={() => setSelectedTab("alwaysOpen")}
                    >
                        Always Open
                    </Button>
                </ButtonGroup>

                {/* Scholarship Cards */}
                <Grid container spacing={2}>
                    {renderScholarships(selectedTab)}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ScholarshipList;