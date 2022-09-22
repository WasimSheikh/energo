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
import Button from '@mui/material/Button';
import { Link ,useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { getCompany } from '../../redux/store/reducers/slices/UserSlice';
import { store } from '../../redux/store';


function CompanyView() {
  const mdTheme = createTheme();
  const params = useParams();
  const [id,setId] = useState('');
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


    useEffect(() => {
     //if(id!=''){
        store.dispatch(getCompany()).then((res: any) => {
            if (res && res.payload) {
                setId(res.payload.id);
                setCompanyName(res.payload.companyName);
                setEmail(res.payload.email);
                setPhone(res.payload.phone);
                setWebsite(res.payload.website);
                setAddress1(res.payload.address1);
                setAddress2(res.payload.address2);
                setCity(res.payload.city);
                setCountry(res.payload.country);
                setPostalCode(res.payload.postalCode);
                setLogo(res.payload.logo);
                setIsHeadauator(res.payload.isHeadauator);
            } 
        }); 
     //}
    });

  const theme = useTheme();

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
                 View Company
                </Typography>
                <Divider />
                  <Box sx={{ mt: 1 }}>
                  <Grid container spacing={2} rowSpacing={1} sx={{ mb: 2 }} >
                      <Grid item xs={6} sm={6}> 
                            <Box> Comapny Name : <Box component="span">{companyName}</Box></Box>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                            <Box> Website : <Box component="span" >{website}</Box></Box>
                      </Grid>
                      <Grid item xs={6} sm={6}> 
                            <Box> Email : <Box component="span">{email}</Box></Box>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                            <Box> Phone : <Box component="span">{phone}</Box></Box>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                            <Box> Address : <Box component="span">{address1}</Box></Box>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                            <Box> Street : <Box component="span">{address2}</Box></Box>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                            <Box> City : <Box component="span">{city}</Box></Box>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                            <Box> ZipCode : <Box component="span">{postalCode}</Box></Box>
                       </Grid>
                       <Grid item xs={6} sm={6}>
                            <Box> Country : <Box component="span">{country}</Box></Box>
                       </Grid>
                       <Grid item xs={6} sm={6}>
                            <Box> Company Headquater Office : <Box component="span">{isHeadauator}</Box></Box>
                       </Grid>
                       <Grid item xs={6} sm={6}>
                            <Box> Company Logo : <Box component="span">{logo}</Box></Box>
                       </Grid>
                       
                    </Grid>
                    
                   
                    <Divider />
                      <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
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
  return <CompanyView/>;
}