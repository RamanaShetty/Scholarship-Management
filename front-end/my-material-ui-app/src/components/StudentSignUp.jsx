import React, { useState } from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, IconButton, InputAdornment } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const colleges = [
    "Indian Institute of Technology Bombay (IIT Bombay)",
    "Indian Institute of Technology Delhi (IIT Delhi)",
    "Indian Institute of Technology Madras (IIT Madras)",
    "Indian Institute of Technology Kanpur (IIT Kanpur)",
    "Indian Institute of Technology Kharagpur (IIT Kharagpur)",
    "Indian Institute of Science (IISc) Bangalore",
    "National Institute of Technology Tiruchirappalli (NIT Trichy)",
    "Indian Institute of Technology Roorkee (IIT Roorkee)",
    "Vellore Institute of Technology (VIT)",
    "Birla Institute of Technology and Science (BITS Pilani)",
    "Manipal Institute of Technology (MIT Manipal)",
    "Delhi Technological University (DTU)",
    "Jamia Millia Islamia (JMI)",
    "Punjab Engineering College (PEC) Chandigarh",
    "Jawaharlal Nehru Technological University (JNTU) Hyderabad",
    "Lal Bahadur Shastri Institute of Technology & Management (LBSTMT)",
    "Thapar Institute of Engineering and Technology (TIET)",
    "Nirma University",
    "SASTRA University",
    "Shiv Nadar University",
    "CMR Institute of Technology",
    "CMR College of Engineering & Technology",
    "CMR Engineering College",
    "CMR College of Pharmacy"
]
;

const Signup = () => {
    const paperStyle = { padding: '20px 30px', width: 400, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        age: '',
        GPA: '',
        instituteName: '',
        instituteCode: '',
        acceptedTerms: false,
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // Separate state for re-enter password

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { password, confirmPassword, acceptedTerms, ...requiredFields } = formData;

        // Validation for empty fields
        let newErrors = {};
        Object.keys(requiredFields).forEach((key) => {
            if (!formData[key]) newErrors[key] = `${key} is required`;
        });

        // Check if passwords match
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Ensure terms are accepted
        if (!acceptedTerms) {
            newErrors.acceptedTerms = 'You must accept the terms and conditions.';
        }

        setErrors(newErrors);

        // If no errors, proceed with form submission logic
        if (Object.keys(newErrors).length === 0) {
            console.log('Signup data:', formData);
            alert('Form submitted successfully!');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <AccountBoxIcon />
                    </Avatar>
                    <h2>Student Registration Form</h2>
                    <Typography variant="caption" gutterBottom>Please fill this form to create an account!</Typography>
                </Grid>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        style={{ margin: '8px 0' }}
                    />
                    {/* Password Field */}
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        style={{ margin: '8px 0' }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleShowPassword}>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    {/* Re-enter Password Field */}
                    <TextField
                        fullWidth
                        label="Re-enter Password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        style={{ margin: '8px 0' }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleShowConfirmPassword}>
                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        style={{ margin: '8px 0' }}
                    />

                    <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        style={{ margin: '8px 0' }}
                    />

                    <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        error={!!errors.address}
                        helperText={errors.address}
                        style={{ margin: '8px 0' }}
                    />

                    <TextField
                        fullWidth
                        label="Age"
                        name="age"
                        placeholder="Enter your age"
                        value={formData.age}
                        onChange={handleChange}
                        error={!!errors.age}
                        helperText={errors.age}
                        style={{ margin: '8px 0' }}
                    />

                    <TextField
                        fullWidth
                        label="GPA"
                        name="GPA"
                        placeholder="Enter your GPA"
                        value={formData.GPA}
                        onChange={handleChange}
                        error={!!errors.GPA}
                        helperText={errors.GPA}
                        style={{ margin: '8px 0' }}
                    />

                    <FormControl fullWidth style={{ margin: '4px 0' }} error={!!errors.instituteName}>
                        <InputLabel id="institute-name-label">Institute Name</InputLabel>
                        <Select
                            labelId="institute-name-label"
                            name="instituteName"
                            value={formData.instituteName}
                            onChange={handleChange}
                        >
                            {colleges.map((college, index) => (
                                <MenuItem key={index} value={college}>
                                    {college}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.instituteName && <FormHelperText>{errors.instituteName}</FormHelperText>}
                    </FormControl>


                    <TextField
                        fullWidth
                        label='Institute Code'
                        name='instituteCode'
                        placeholder="Enter your institute code"
                        value={formData.instituteCode}
                        onChange={handleChange}
                        error={!!errors.instituteCode}
                        helperText={errors.instituteCode}
                        style={{ margin: '4px 0' }}
                    />

                    <div style={{ margin: '8px 0', display: 'flex', justifyContent: 'flex-start' }}>
                        <FormControlLabel
                            control={<Checkbox name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} />}
                            label="I accept the terms and conditions."
                        />
                        {errors.acceptedTerms && <Typography color="error">{errors.acceptedTerms}</Typography>}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                        >
                            Sign Up
                        </Button>
                    </div>

                </form>
            </Paper>
        </Grid>
    );
};

export default Signup;
