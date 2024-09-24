import * as React from 'react';
import { Box, Button, Table, TableCell, TableContainer, TableRow, Typography, TableHead, TableBody } from '@mui/material'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

export default function StudentApproval() {
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