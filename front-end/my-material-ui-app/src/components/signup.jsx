import React, { useState } from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, Checkbox, Select, MenuItem, InputLabel, FormHelperText } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const colleges = [
    "Harvard University",
    "Stanford University",
    "MIT",
    "California Institute of Technology",
    "University of Oxford",
    "University of Cambridge",
    "University of Chicago",
    "Imperial College London",
    "ETH Zurich",
    "University College London"
];

const Signup = () => {
    const paperStyle = { padding: '20px 30px', width: 400, height: 'auto', margin: "20px auto" };
    const headerStyle = { margin: 0 };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const marginTop = { marginTop: 2 };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        dob: '',
        gender: '',
        college: '',
        password: '',
        confirmPassword: '',
        acceptedTerms: false
    });

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.acceptedTerms) {
            alert("You must accept the terms and conditions.");
            return;
        }
        // Add signup logic here
        console.log('Signup data:', formData);
    };

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AccountBoxIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account!</Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label='First Name' name='firstName' placeholder="Enter your first name" style={{ margin: '4px 0' }} onChange={handleChange} />
                    <TextField fullWidth label='Last Name' name='lastName' placeholder="Enter your last name" style={{ margin: '4px 0' }} onChange={handleChange} />
                    <TextField fullWidth label='Email' name='email' placeholder="Enter your email" style={{ margin: '4px 0' }} onChange={handleChange} />
                    <TextField fullWidth label='Age' name='age' placeholder="Enter your age" type="number" style={{ margin: '4px 0' }} onChange={handleChange} />
                    <TextField fullWidth label='Date of Birth' name='dob' placeholder="Enter your date of birth" type="date" style={{ margin: '4px 0' }} InputLabelProps={{ shrink: true }} onChange={handleChange} />

                    <FormControl component="fieldset" style={marginTop}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Gender:</span>
                            <RadioGroup aria-label="gender" name="gender" onChange={handleChange} style={{ display: 'flex', flexDirection: 'row' }}>
                                <FormControlLabel style={{ marginLeft: '10px' }} value="female" control={<Radio />} label="Female" />
                                <FormControlLabel style={{ marginLeft: '10px' }} value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </div>
                    </FormControl>

                    <FormControl fullWidth style={{ margin: '4px 0' }}>
                        <InputLabel id="college-label">College Name</InputLabel>
                        <Select
                            labelId="college-label"
                            name="college"
                            value={formData.college}
                            onChange={handleChange}
                        >
                            {colleges.map((college, index) => (
                                <MenuItem key={index} value={college}>{college}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField fullWidth label='Password' name='password' placeholder="Enter your password" type="password" style={{ margin: '4px 0' }} onChange={handleChange} />
                    <TextField fullWidth label='Re-enter Password' name='confirmPassword' placeholder="Confirm your password" type="password" style={{ margin: '4px 0' }} onChange={handleChange} />

                    <FormControlLabel
                        control={<Checkbox name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} />}
                        label="I accept the terms and conditions."
                    />

                    <Button type='submit' variant='contained' color='primary' style={{ ...marginTop, display: 'block', margin: '10px auto' }}>Sign up</Button>
                </form>

                <Typography variant='body2' style={{ marginTop: '20px', textAlign: 'center' }}>
                    Already existing user? 
                    <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => { /* Placeholder for login functionality */ }}>
                        Login
                    </span>
                </Typography>
            </Paper>
        </Grid>
    );
};

export default Signup;