import {createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Navigation from '../common/Navigation';
import Divider from '@mui/material/Divider';
import Footer from '../common/Footer';
import Header from '../common/Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from "react-router-dom";
import { UserMgmtSlice } from '../../redux/store/reducers/slices/UserSlice';
import { store } from '../../redux/store';
import React, { useEffect, useState } from 'react';

const mdTheme = createTheme();

const updateAddress = (address: any) => {
  store.dispatch(UserMgmtSlice.actions.setUserAddress(address));
};

function CompanyAdd() {
  const [companyName,setCompanyName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [website,setWebsite] = useState('');
  const [address1,setAddress1] = useState('');
  const [address2,setAddress2] = useState('');
  const [city,setCity] = useState('');
  const [country,setCountry] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [logo,setLogo] = useState('');
  const [isHeadauator,setIsHeadauator] = useState('');
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget); 
    console.log(data.get('email'));
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
                Add Company
                </Typography>
                <Divider />
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <Grid container spacing={2} rowSpacing={1} >
                      <Grid item xs={6} sm={6}>
                          <TextField
                            margin="normal"
                            id="company_name"
                            required
                            name="company_name"
                            autoFocus
                            label="Company Name"
                            fullWidth
                          />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                          <TextField
                            margin="normal"
                            id="website"
                            required
                            name="website"
                            autoFocus
                            label="Website"
                            fullWidth
                          />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoFocus
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
                        /> </Grid>
                       
                        <Grid item xs={2} sm={6} mt={2}>
                        <FormControlLabel
                            control={<Checkbox name="headquater" value="yes" />}
                            label="Company Headquater Office"
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        />
                           
                        </Grid>
                        <Grid item xs={6} sm={6}>
                        <Button variant="contained" component="label"  sx={{ mb: 3 }}>
                            Upload Logo
                            <input hidden accept="image/*" multiple type="file" />
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={6}>
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
                        <Button variant="contained" component={Link} to="/companies" sx={{ ml: 1 }} >Cancel </Button>
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
  return <CompanyAdd />;
}