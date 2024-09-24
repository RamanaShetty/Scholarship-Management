import React from 'react';
import {Link} from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import { AppBar, Box, Button, Container, Grid2, IconButton, Toolbar, Typography } from '@mui/material';



export default function Home() {

    return (
        <>
            {/* <header> */}
                {/* <Box sx={{ flexGrow: 1 }}> */}
                    <AppBar position='static' sx={{bgcolor:'#00008B'}}>
                        <Toolbar>
                            <IconButton size="large" edge="start" color="inherit"><SchoolIcon /></IconButton>
                            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>Logo</Typography>
                            <Button color="inherit" component={Link} to="/scholarshiplist">List Of Scholarships</Button>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/register">Register</Button>
                        </Toolbar>
                    </AppBar>
                {/* </Box> */}
            {/* </header> */}
            {/* <Container> */}
                <Box display='flex' justifyContent="center" alignItems="center" flexDirection={{xs:'column', md:'row'}} sx={{height:"100vh"}} gap={12}>
                    <Grid2 container justifyContent='center' alignItems='center' component={Link} to="./login" state={{formStudent: true}} sx={{bgcolor:"#00008B",height:{xs:'200px', md:'250px'},width:{xs:'200px', md:'250px'}} }>
                        <Typography variant='h6'sx={{color:"white"}}>Student</Typography>
                    </Grid2>
                    <Grid2 container justifyContent='center' alignItems='center' component={Link} to="./login" state={{formInstitute: true}} sx={{bgcolor:"#00008B", height:{xs:'200px',md:'250px'},width:{xs:'200px', md:'250px'} }} > 
                        <Typography variant="h6" sx={{color:"white"}}>Instiute</Typography>
                    </Grid2>
                    <Grid2 container justifyContent='center' alignItems='center' component={Link} to="./login" state={{formGovernment: true}} sx={{bgcolor:"#00008B", height:{xs:'200px',md:'250px'},width:{xs:'200px', md:'250px'}}}>
                        <Typography variant="h6" sx={{color:"white"}}>Government</Typography>
                    </Grid2>
                </Box>
            {/* </Container> */}
        </>
    )
}