import {AppBar, Button, Container, Toolbar, Box, Tooltip, Avatar, Typography ,Menu ,MenuItem, IconButton} from '@mui/material';
import * as React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import { useState } from 'react';
import  ManageScholarship from "./Government/ManageScholarship"
import CollegeApproval from "./Government/CollegeApproval"
import Studentapproval from "./Government/Studentapproval"


const settings=['Profile','Logout'];

function GovernmentDashboard() {
    const [anchorElementUser,setAnchorElementUser] =React.useState(null);
    const [aciveSection,setActiveSection] = React.useState("");

    const handleOpenUserMenu=(event)=> {
        setAnchorElementUser(event.currentTarget);
    }

    const handleCloseUserMenu = ()=> {
        setAnchorElementUser(null);
    }

    return (
        <>
        <AppBar position='static' sx={{bgcolor:'#00008B'}}>
            <Container maxWidth='xl'>
                <Toolbar>
                    <SchoolIcon sx={{display:{xs:'none',md:'flex'},mr:1}}/>
                    <Typography 
                    variant='h6'
                    nowrap
                    component='a'
                    sx={{
                        mr:2,
                        display:{xs:'none',md:'flex'},
                        fontFamily:'monospace',
                        fontWeight:700,
                        letterSpacing:'.3rem',
                        color:'inhert',
                        textDecoration:'none'
                    }}
                    >Governement
                    </Typography>
                    <Box sx={{flexGrow:1,display:{xs:'none',md:'flex',width:'150px'}}}>
                        <Button
                        key='scholarships'
                        sx={{my:2,color:'white',display:'block'}}
                        onClick={()=> {
                            setActiveSection("ManageScholarship")
                        }}
                        >Scholarships</Button>
                        <Button
                        key='status'
                        sx={{my:2,color:'white',display:'block'}}
                        onClick={()=> {
                            setActiveSection("Studentapproval")
                        }}
                        >Stud Approval</Button>
                        <Button
                        key='status'
                        sx={{my:2,color:'white',display:'block'}}
                        onClick={()=> {
                            setActiveSection("CollegeApproval")
                        }}
                        >Coll Approval</Button>
                    </Box>
                    <Box sx={{flexGrow:0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p:0}}>
                                <Avatar alt='profile_pic' src=""/>
                            </IconButton>
                        </Tooltip>
                        <Menu sx={{mt:'45px'}}
                        id='menu-appbar'
                        anchorEl={anchorElementUser}
                        anchorOrigin={{
                            vertical:'top',
                            horizontal:'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical:'top',
                            horizontal:'right'
                        }}
                        open={Boolean(anchorElementUser)}
                        onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting)=>( 
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography
                                    sx={{textAlign:'center'}}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        {(aciveSection==="ManageScholarship" && <ManageScholarship/>) }
        {(aciveSection==="Studentapproval" && <Studentapproval/>) }
        {(aciveSection==="CollegeApproval" && <CollegeApproval/>) }
        </>
    )
}

export default GovernmentDashboard;