import React, { useState } from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, FormHelperText, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const instituteAffiliations = [
    "State University",
    "Private University",
    "Autonomous",
    "Central Government Institution",
    "Other"
];

const InstituteRegistration = () => {
    const paperStyle = { padding: '30px 20px', width: 500, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const leftAlignStyle = { justifyContent: 'flex-start', margin: '8px 0' }; // Added for checkbox alignment

    const [formData, setFormData] = useState({
        instituteName: '',
        instituteCode: '',
        affiliationDetails: '',
        instituteAddress: '',
        instituteContact: '',
        headOfInstitutionName: '',
        headOfInstitutionContact: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptedTerms: false
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    // Validation function
    const validate = () => {
        let tempErrors = {};
        Object.keys(formData).forEach((field) => {
            if (!formData[field] && field !== 'acceptedTerms') {
                tempErrors[field] = `${field.split(/(?=[A-Z])/).join(' ')} is required.`;
            }
        });
        if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = "Passwords do not match.";
        }
        if (!formData.acceptedTerms) {
            tempErrors.acceptedTerms = "You must accept the terms and conditions.";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form Data:', formData);
            // Submit form logic here
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <LockIcon />
                    </Avatar>
                    <h2>Institute Registration</h2>
                    <Typography variant='caption'>Please fill in this form to register your institute</Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    {/* Institute Name */}
                    <TextField
                        fullWidth
                        label='Institute Name'
                        name='instituteName'
                        placeholder="Enter your institute name"
                        value={formData.instituteName}
                        onChange={handleChange}
                        error={!!errors.instituteName}
                        helperText={errors.instituteName}
                        style={{ margin: '8px 0' }}
                    />

                    {/* Institute Code */}
                    <TextField
                        fullWidth
                        label='Institute Code'
                        name='instituteCode'
                        placeholder="Enter your institute code"
                        value={formData.instituteCode}
                        onChange={handleChange}
                        error={!!errors.instituteCode}
                        helperText={errors.instituteCode}
                        style={{ margin: '8px 0' }}
                    />

                    {/* Affiliation Details */}
                    <FormControl fullWidth style={{ margin: '8px 0' }} error={!!errors.affiliationDetails}>
                        <InputLabel id="affiliation-details-label">Affiliation Details</InputLabel>
                        <Select
                            labelId="affiliation-details-label"
                            name="affiliationDetails"
                            value={formData.affiliationDetails}
                            onChange={handleChange}
                            displayEmpty
                            sx={{ textAlign: 'left', paddingLeft: '8px' }}  // Left-align the selected option and add padding
                            MenuProps={{
                                PaperProps: {
                                    style: { textAlign: 'left' } // Ensure the options are left-aligned in the dropdown
                                }
                            }}
                        >
                            {instituteAffiliations.map((affiliation, index) => (
                                <MenuItem key={index} value={affiliation}>
                                    {affiliation}
                                </MenuItem>
                            ))}
                        </Select>

                        {errors.affiliationDetails && <FormHelperText>{errors.affiliationDetails}</FormHelperText>}
                    </FormControl>

                    {/* Institute Address */}
                    <TextField
                        fullWidth
                        label='Institute Address'
                        name='instituteAddress'
                        placeholder="Enter your institute address"
                        value={formData.instituteAddress}
                        onChange={handleChange}
                        error={!!errors.instituteAddress}
                        helperText={errors.instituteAddress}
                        style={{ margin: '8px 0' }}
                    />

                    {/* Institute Contact */}
                    <TextField
                        fullWidth
                        label='Institute Contact'
                        name='instituteContact'
                        placeholder="Enter institute contact number"
                        value={formData.instituteContact}
                        onChange={handleChange}
                        error={!!errors.instituteContact}
                        helperText={errors.instituteContact}
                        style={{ margin: '8px 0' }}
                    />

                    {/* Head of Institution Name */}
                    <TextField
                        fullWidth
                        label='Head of Institution Name'
                        name='headOfInstitutionName'
                        placeholder="Enter head of institution's name"
                        value={formData.headOfInstitutionName}
                        onChange={handleChange}
                        error={!!errors.headOfInstitutionName}
                        helperText={errors.headOfInstitutionName}
                        style={{ margin: '8px 0' }}
                    />

                    {/* Head of Institution Contact */}
                    <TextField
                        fullWidth
                        label='Head of Institution Contact'
                        name='headOfInstitutionContact'
                        placeholder="Enter head of institution's contact number"
                        value={formData.headOfInstitutionContact}
                        onChange={handleChange}
                        error={!!errors.headOfInstitutionContact}
                        helperText={errors.headOfInstitutionContact}
                        style={{ margin: '8px 0' }}
                    />

                    {/* Email */}
                    <TextField
                        fullWidth
                        label='Email'
                        name='email'
                        placeholder="Enter institute's email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        style={{ margin: '8px 0' }}
                    />

                    {/* Password */}
                    <TextField
                        fullWidth
                        label='Password'
                        name='password'
                        placeholder="Enter your password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        style={{ margin: '8px 0' }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => togglePasswordVisibility('password')}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            )
                        }}
                    />

                    {/* Confirm Password */}
                    <TextField
                        fullWidth
                        label='Re-enter Password'
                        name='confirmPassword'
                        placeholder="Confirm your password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        style={{ margin: '8px 0' }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => togglePasswordVisibility('confirmPassword')}>
                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            )
                        }}
                    />
                    <div style={{ margin: '8px 0', display: 'flex', justifyContent: 'flex-start' }}>
                    {/* Accept Terms and Conditions */}
                    <FormControlLabel
                        control={<Checkbox name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} />}
                        label="I accept the terms and conditions."
                        style={leftAlignStyle} // Left-align the checkbox
                    />
                    {errors.acceptedTerms && <Typography color="error">{errors.acceptedTerms}</Typography>}
                    </div>
                    {/* Submit Button */}
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        style={{ marginTop: '20px', display: 'block', margin: 'auto' }}
                    >
                        Register
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
};

export default InstituteRegistration;
