// CREATE TABLE Students (
//     student_id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100),
//     email VARCHAR(100) UNIQUE,
//     password VARCHAR(255),
//     phone VARCHAR(15),
//     address VARCHAR(255),
//     date_of_birth DATE,
//     current_level_of_education VARCHAR(50),
//     GPA DECIMAL(3, 2),
//     profile_updated BOOLEAN DEFAULT 0,
//     is_active BOOLEAN DEFAULT 1
// );


// CREATE TABLE Applications (
//     application_id INT AUTO_INCREMENT PRIMARY KEY,
//     student_id INT,
//     program_name TEXT,
//     scholarship_id INT,
//     application_date DATE,
//     status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
//     submitted_documents VARCHAR(255),  -- Store file paths here
//     FOREIGN KEY (student_id) REFERENCES Students(student_id),
//     FOREIGN KEY (scholarship_id) REFERENCES Scholarships(scholarship_id)
// );

// CREATE TABLE Institutes (
//     institute_id INT AUTO_INCREMENT PRIMARY KEY,
//     institute_name VARCHAR(255),
//     institute_code VARCHAR(50),
//     affiliation_details TEXT,
//     institute_address VARCHAR(255),
//     institute_contact VARCHAR(15),
//     head_of_institution_name VARCHAR(100),
//     head_of_institution_contact VARCHAR(15),
//     registration_number VARCHAR(50),
//     registration_approved BOOLEAN DEFAULT 0
// );


import * as React from 'react';
import { Box, Button, Table, TableCell, TableContainer, TableRow, Typography, TableHead, TableBody } from '@mui/material'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

export default function CollegeApproval() {
    return (
        <>
            <Typography variant='h3' textAlign='center' sx={{mt:2 ,mb:2}} >College Approval</Typography>
            <TableContainer>
                <Table>
                    <TableHead sx={{ bgcolor: '#00008B' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>Insitute Name</TableCell>
                            <TableCell sx={{ color: 'white' }}>Institution Code</TableCell>
                            <TableCell sx={{ color: 'white' }}>Affilated Details</TableCell>
                            <TableCell sx={{ color: 'white' }}>Head Of Institute</TableCell>
                            <TableCell sx={{ color: 'white' }}>Registration Number</TableCell>
                            <TableCell sx={{ color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>znxkj</TableCell>
                            <TableCell>11111</TableCell>
                            <TableCell>21qw</TableCell>
                            <TableCell>asd</TableCell>
                            <TableCell>sds122r</TableCell>
                            <TableCell >
                                <Box display='flex' gap={2}>
                                    <Button sx={{ bgcolor: "lightgreen" }}><ThumbUpOffAltIcon /></Button>
                                    <Button sx={{ bgcolor: "lightcoral" }}><ThumbDownOffAltIcon /></Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}