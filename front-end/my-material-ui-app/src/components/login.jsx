import React, { useState } from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button, Checkbox, FormControlLabel, IconButton, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import {Link, useLocation,useNavigate} from 'react-router-dom';

const Login = () => {
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" };
    const headerStyle = { margin: 0 };
    const avatarStyle = { backgroundColor: '#1bbd7e' };

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: false,
        password: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // used to navigate to that perticular page

    const location = useLocation();
    const navigate = useNavigate();

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData;
        let valid = true;
        let newErrors = { email: false, password: false };

        // Email validation
        if (!validateEmail(email)) {
            newErrors.email = true;
            valid = false;
        }

        // Password validation
        if (!password) {
            newErrors.password = true;
            valid = false;
        }

        setErrors(newErrors);

        // Remember Me checkbox validation
        if (!rememberMe) {
            alert('Please check the "Remember Me" box.');
            valid = false;
        }

        if (valid) {
            // Proceed with login logic
            console.log('Form submitted', formData);


            //to naviagte to that particular page
            if(location.state && location.state.formInstitute ) {
                navigate('/institutedashboard')
            }
            else if(location.state && location.state.formStudent ) {
                navigate('/studentdashboard')
            }
            else if(location.state && location.state.formGovernment ) {
                navigate('/governementdashboard')
            }
            else {
                navigate('/')
            }


        } else {
            console.log('Form has errors', newErrors);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: false });
    };

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Login</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label='Email'
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        helperText={errors.email ? 'Please enter a valid email' : ''}
                        style={{ marginBottom: '15px' }}
                    />

                    <TextField
                        fullWidth
                        label='Password'
                        name="password"
                        placeholder="Enter your password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        helperText={errors.password ? 'Password is required' : ''}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handlePasswordVisibility}>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        style={{ marginBottom: '15px' }}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                                color="primary"
                            />
                        }
                        label="Remember me"
                        style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}
                    />

                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        startIcon={<LoginIcon />}
                    >
                        Login
                    </Button>

                    <Typography variant='body2' style={{ marginTop: '15px', textAlign: 'center' }} component={Link} to='/register' state={{formInstitute:location.state&&location.state.formInstitute, 
                        formStudent:location.state&&location.state.formStudent, 
                        formGovernment:location.state&&location.state.formGovernment}}>
                        Not Registered Yet?{" "}
                        <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => { /* Placeholder for signup logic */ }}>
                            Create an account
                        </span>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    );
};

export default Login;
