import {createTheme, Theme, ThemeProvider,useTheme  } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import Header from '../common/Header';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';


const mdTheme = createTheme();
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander'
];

function UserAdd() {
  const theme = useTheme();
  const [companyName,setCompanyName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [address1,setAddress1] = useState('');
  const [address2,setAddress2] = useState('');
  const [city,setCity] = useState('');
  const [country,setCountry] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setlastName] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCompanyName(event.target.value);
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {email: data.get('email'),first_name: data.get('first_name'),last_name: data.get('last_name') }
    console.log(formData);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Navigation />
        <Box
          component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                 Add User
                </Typography>
                <Divider />
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <Grid container spacing={2} rowSpacing={1} >
                      <Grid item xs={6} sm={6} mt={2}>
                      <FormControl fullWidth >
                      <InputLabel id="company_name_label">Company Name</InputLabel>
                      <Select
                        labelId="company_name_label"
                        required
                        id="company_name"
                        value={companyName}
                        label="Company Name"
                        autoFocus
                        onChange={handleChange}
                      >
                       <MenuItem value="">-Select-</MenuItem>
                          {names.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                            >
                            {name}
                            </MenuItem>
                          ))}
                       </Select>
                    </FormControl>
                      </Grid>
                      <Grid item xs={2} sm={6} mt={2}>
                        <FormControlLabel
                            control={<Checkbox name="global_user" value="yes" />}
                            label="Global User"
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        />   
                      </Grid>
                      <Grid item xs={6} sm={6}>
                          <TextField
                            margin="normal"
                            id="first_name"
                            required
                            name="first_name"
                            autoFocus
                            label="First Name"
                            fullWidth
                          />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                          <TextField
                            margin="normal"
                            id="last_name"
                            required
                            name="last_name"
                            autoFocus
                            label="Last Name"
                            fullWidth
                          />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                           autoFocus
                        />
                      </Grid>
                      <Grid item xs={6} sm={6}> 
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="address"
                              label="Address"
                              name="address"
                            autoFocus
                          />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="street 1"
                              label="Street"
                              name="street"
                            autoFocus
                          />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="city"
                              label="City"
                              name="city"
                              autoFocus
                          />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                      <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="zipcode"
                            label="Zipcode"
                            name="zipcode"
                            autoFocus
                        />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                      <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="country"
                            label="Country"
                            name="country"
                           autoFocus
                        /> 
                        </Grid>
                        <Grid item xs={6} sm={6}>
                       </Grid>
                    </Grid>
                    <Typography component="h2" variant="h6" sx={{ mt: 1}} color="primary" gutterBottom>
                        Login Information
                    </Typography>
                    <Box>
                      Create login information for the user.
                    </Box>
                    <Grid container spacing={2} rowSpacing={1} >
                      <Grid item xs={6} >
                      <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"  
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                      </Grid>
                      <Grid item xs={6} >
                          <Typography component="h6" color="primary" variant="h6" sx={{ mt: 2 }}  gutterBottom>
                            Roles/Permission
                            </Typography>
                            <Typography >
                              <FormControlLabel
                                      control={<Checkbox name="admin" value="yes" />}
                                      label="Admin"
                                      sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                              />  
                            </Typography>
                            <Typography >
                              <FormControlLabel
                                    control={<Checkbox name="auditor" value="yes" />}
                                    label="Auditor"
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                              />  
                            </Typography> 
                      </Grid>
                     </Grid>
                    
                    <Divider />
                      <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
                          <Button
                          type="submit"
                          variant="contained"
                        >
                        Submit
                          </Button>
                        <Button variant="contained" component={Link} to="/users" sx={{ ml: 1 }} >Cancel </Button>
                      </Toolbar> 
                      </Box>
                </Paper>
              </Grid>
            </Grid>
           <Footer />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default function Add() {
  return <UserAdd />;
}