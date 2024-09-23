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


import * as React from 'react';
import { Box, Button, Table, TableCell, TableContainer, TableRow, Typography, TableHead, TableBody } from '@mui/material'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

export default function Studentapproval() {
    return (
        <>
            <Typography variant='h3' textAlign='center' sx={{mt:2 ,mb:2}}>Student Approval</Typography>
            <TableContainer>
                <Table>
                    <TableHead sx={{bgcolor:'#00008B'}}>
                        <TableRow>
                            <TableCell sx={{color:'white'}}>ID</TableCell>
                            <TableCell sx={{color:'white'}}>Progarm Name</TableCell>
                            <TableCell sx={{color:'white'}}>Application Date</TableCell>
                            <TableCell sx={{color:'white'}}>Documents</TableCell>
                            <TableCell sx={{color:'white'}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>anbhanmnjn</TableCell>
                            <TableCell>mnbs</TableCell>
                            <TableCell>nbhv</TableCell>
                            <TableCell >
                                <Box display='flex' gap={2}>
                                    <Button sx={{ bgcolor: "lightgreen" }}><ThumbUpOffAltIcon/></Button>
                                    <Button sx={{ bgcolor: "lightcoral" }}><ThumbDownOffAltIcon/></Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}