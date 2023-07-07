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
import { getUser } from '../../redux/store/reducers/slices/UserSlice';
import { store } from '../../redux/store';
import capitalizeFirstLetter from '../utils/FormUtils';


function UserView() {
  const mdTheme = createTheme();
  const theme = useTheme();
  const params = useParams();
  const [id,setId] = useState('');
  const [companyName,setCompanyName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('');
  const [street,setStreet] = useState('');
  const [city,setCity] = useState('');
  const [country,setCountry] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [permission, setPermission] = React.useState('');
  const [globalUser, setGlobalUser] = React.useState('');
  const [onload,setOnload] = useState(false);

  useEffect(() => {
     if(onload==false){
      const userId = window.location.href.split('/')[5]
      const formData = {id:userId};  
       store.dispatch(getUser(formData)).then((res: any) => {
        setOnload(true);
           if (res && res.payload) {
              setId(res.payload.user?.id);
              setCompanyName(res.payload.user?.company?.title);
              setEmail(res.payload.user?.email);
              setPhone(res.payload.user?.phone);
              setAddress(res.payload.user?.address?.address);
              setStreet(res.payload.user?.address?.street);
              setFirstName(res.payload.user?.first_name);
              setLastName(res.payload.user?.last_name);
              setCity(res.payload.user?.address?.city);
              setCountry(res.payload.user?.address?.country);
              setPostalCode(res.payload.user?.address?.zipcode);
              setPermission(res.payload.user?.permission);
              if(res.payload.user?.globalUser===0){
                setGlobalUser('No');
              }else{
                setGlobalUser('Yes');
              }
           } 
       }); 
    }
   });

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
                 View User
                </Typography>
                <Divider />
                  <Box sx={{ mt: 1 }}>
                  <Grid container spacing={2} rowSpacing={1} >
                      <Grid item xs={6} sm={6}> 
                            <Box> Comapny Name : <Box component="span">{companyName}</Box></Box>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                            <Box> Global User : <Box component="span">{globalUser}</Box></Box>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                            <Box> First Name : <Box component="span" >{firstName}</Box></Box>
                      </Grid>
                      <Grid item xs={6} sm={6}> 
                            <Box> Last Name : <Box component="span">{lastName}</Box></Box>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                            <Box> Phone : <Box component="span">{phone}</Box></Box>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                            <Box> Address : <Box component="span">{address}</Box></Box>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                            <Box> Street : <Box component="span">{street}</Box></Box>
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
                    </Grid>
                    <Typography component="h2" variant="h6" sx={{ mt: 1}} color="primary" gutterBottom>
                        Login Information
                    </Typography>
                    <Grid container spacing={2} rowSpacing={1} >
                      <Grid item xs={6} >
                        <div> Email : <span>{email}</span></div>
                        
                      </Grid>
                      <Grid item xs={6} >
                          <Typography component="h6" color="primary" variant="h6" sx={{ mt: 2 }}  gutterBottom>
                            Roles/Permission
                            </Typography>
                            {capitalizeFirstLetter(permission)}
                      </Grid>
                    </Grid>
                    <Divider />
                      <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
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
  return <UserView/>;
}