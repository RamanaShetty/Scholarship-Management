import {Table, Box, Typography, TableContainer, TableHead, TableRow, TableCell, TableBody} from "@mui/material"

export default function Status() {

    return (
        <>
        <Box display="flex" justifyContent="flex-end" sx={{mt:2}}>
            </Box>
            <Typography variant="h3" textAlign='center' sx={{ mt: 2, mb: 2 }}>Scholarship Status</Typography>

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
                            <TableCell sx={{ color: 'white' }}>Status</TableCell>
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
                                Pending
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )

}