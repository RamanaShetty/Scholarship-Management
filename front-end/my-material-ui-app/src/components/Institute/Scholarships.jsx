import {Table, Box, Button, Typography, TableContainer, TableHead, TableRow, TableCell, TableBody} from "@mui/material"

export default function Scholarships() {

    return (
        <>
        <Box display="flex" justifyContent="flex-end" sx={{mt:2}}>
            </Box>
            <Typography variant="h3" textAlign='center' sx={{ mt: 2, mb: 2 }}>Scholarships</Typography>

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
                            {/* <TableCell sx={{ color: 'white' }}>Action</TableCell> */}
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
                            {/* <TableCell>
                                <Box display='flex' flexDirection='row' gap={1}>
                                    <Button variant="contained" sx={{ bgcolor: "lightgreen" }}>
                                        Apply</Button>
                                    <Button variant="contained" sx={{ bgcolor: "lightcoral" }}><DeleteIcon />
                                    </Button>
                                </Box>
                            </TableCell> */}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )

}