// CREATE TABLE Scholarships (
//     scholarship_id INT AUTO_INCREMENT PRIMARY KEY,
//     program_name VARCHAR(100),
//     date_of_addition DATE,
//     description TEXT,
//     eligibility TEXT,
//     benefits TEXT,
//     deadline DATE,
//     required_documents TEXT,
//     status ENUM('active', 'inactive') DEFAULT 'active'
// );


import * as React from 'react';
import { Table, Box, Button, Typography, TableContainer, TableHead, TableRow, TableCell, TableBody, FormControl, FormLabel, TextField, DialogActions, Dialog, DialogContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import dayjs from 'dayjs';



export default function ManageScholarshipDetails() {
    const [openDialog, setOpenDialog] = useState(false);

    const [rowsData, setRowData] = useState({
        scholarship_id: "",
        program_name: "",
        date_of_addition: "",
        description: "",
        eligibility: "",
        benefits: "",
        deadline: "",
        uploadedDocs: "",
        allocated_funds: "",
        status: ""
    })


    const handleOnChange = (e) => {

        // if(e && e.target) {
        const { name, value } = e.target;
        setRowData({
            ...rowsData,
            [name]: value
        })
        // }
        // else {
        //     setRowData({...rowsData,
        //         deadline:e})

        // }


    }

    const handleOpenForm = (event) => {
        console.log("pressed on add button")
        if (event) {
            console.log("event occured");
        }
        setOpenDialog(true);
    }

    const handleCloseForm = (event) => {
        setOpenDialog(false);
    }

    const onSave = (e) => {
        e.preventDefault();
        console.log(rowsData);
        console.log(rowsData.deadline)
    }

    const validate = (e) => {
        console.log(rowsData.program_name)

        // if (rowsData.program_name !== "") {

        // }

        e.preventDefault();
        onSave(e)
    }



    return (
        <>
            <Box display="flex" justifyContent="flex-end" >
                <Button variant="contained" onClick={handleOpenForm} onClose={() => {
                    console.log("closed")
                }} sx={{ bgcolor: '#00008B' }} mb={2}>
                    Add New Scholorship
                </Button>
            </Box>
            <Typography variant="h3" textAlign='center' sx={{ mt: 2, mb: 2 }}>Manage Scholarship</Typography>

            <TableContainer sx={{ mt: 2 }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#00008B', }} >
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>Progarm Name</TableCell>
                            <TableCell sx={{ color: 'white' }}>Created Date</TableCell>
                            <TableCell sx={{ color: 'white' }}>End Date</TableCell>
                            <TableCell sx={{ color: 'white' }}>Eligibility</TableCell>
                            <TableCell sx={{ color: 'white' }}>Required Docs</TableCell>
                            <TableCell sx={{ color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>absvdg</TableCell>
                            <TableCell>bhdbfdh</TableCell>
                            <TableCell>sbad</TableCell>
                            <TableCell>mcnkjx</TableCell>
                            <TableCell>ckdlvn</TableCell>
                            <TableCell>
                                <Box display='flex' flexDirection='row' gap={1}>
                                    <Button variant="contained" sx={{ bgcolor: "lightgreen" }}>
                                        <EditIcon /></Button>
                                    <Button variant="contained" sx={{ bgcolor: "lightcoral" }}><DeleteIcon />
                                    </Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>


            {/* form to add new Scholarship */}
            <Dialog display='flex' open={openDialog} onClose={handleCloseForm} PaperProps={{ sx: { width: '1000px', height: '1000px' } }}>
                <Typography variant='h5' textAlign={'center'} sx={{ mt: 2 }}>Fill in the details</Typography>

                {/* program_name: "",
        date_of_addition: "",
        description: "",
        eligibility: "",
        benefits: "",
        deadline: "",
        uploadedDocs: "",
        allocated_funds: "",
        status: ""}) */}

                <DialogContent>
                    <FormControl fullWidth>
                        <TextField onChange={handleOnChange} name='program_name' value={rowsData.program_name} label='Program Name' sx={{ mb: 2 }} />
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField label='Created Date' />
                </LocalizationProvider> */}
                        <TextField onChange={handleOnChange} name='description' value={rowsData.description} multiline label='Discription' sx={{ mb: 2 }} />
                        <TextField onChange={handleOnChange} name='eligibility' value={rowsData.eligibility} multiline label='Eligiblity' sx={{ mb: 2 }} />
                        <TextField onChange={handleOnChange} name='benefits' value={rowsData.benefits} multiline label='Benifits' sx={{ mb: 2 }} />

                        {/* date */}
                        <TextField onChange={handleOnChange} label='Deadline' name='deadline' value={rowsData.deadline} InputLabelProps={{ shrink: true }} type="date" sx={{ mb: 2 }} />


                        <TextField onChange={handleOnChange} name='uploadedDocs' value={rowsData.uploadedDocs} multiline label='Required Documents' sx={{ mb: 2 }} />
                        {/* <TextField multiline label='Benifis' /> */}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button>Cancel</Button>
                    <Button onClick={validate}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}





