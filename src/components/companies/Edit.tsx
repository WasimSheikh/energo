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
import { Link, useParams, useNavigate } from "react-router-dom";
import { updateCompany, getCompany } from '../../redux/store/reducers/slices/UserSlice';
import { store } from '../../redux/store';
import React, { useEffect, useState } from 'react';

const mdTheme = createTheme();

function CompanyEdit() {
    const navigate = useNavigate();
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
    const [onload,setOnload] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');
  


  const handleSubmit = (e:any) => {
    e.preventDefault();
    const formData = {
      id:id,
      title:companyName,
      website: website,
      phone:phone,
      email:email,
      address:address1,
      street:address2,
      zipcode:postalCode,
      city:city,
      country:country,
      logo:logo,
      is_headquater:isHeadauator,
    }  
    store.dispatch(updateCompany(formData)).then((res: any) => {
      if (res.payload.status == true) {
        setErrorMessages('');
        navigate("/companies");
      } else {
        setErrorMessages(res.payload?.message);
      }
    });           
  };

  useEffect(() => {
    if(onload==false){
      setOnload(true);
      const companyId = window.location.href.split('/')[5]
      const formData = {id:companyId};  
       store.dispatch(getCompany(formData)).then((res: any) => { 
           if (res && res.payload) {
               setId(res.payload.company?.id);
               setCompanyName(res.payload.company?.title);
               setEmail(res.payload.company?.email);
               setPhone(res.payload.company?.phone);
               setWebsite(res.payload.company?.website);
               setAddress1(res.payload.company?.address?.address);
               setAddress2(res.payload.company?.address?.street);
               setCity(res.payload.company.address?.city);
               setCountry(res.payload.company?.address?.country);
               setPostalCode(res.payload.company?.address?.zipcode);
               setLogo(res.payload.company?.logo);
               setLogo(res.payload.company?.is_headquater);
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
                Edit Company
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
                            label="Company Name"
                            fullWidth
                            value={companyName}
                            onChange={(e) => {
                              setCompanyName(e.target.value);
                            }}
                          />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                          <TextField
                            margin="normal"
                            id="website"
                            required
                            name="website"
                            label="Website"
                            fullWidth
                            value={website}
                            onChange={(e) => {
                              setWebsite(e.target.value);
                            }}
                          />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={email}
                            id="email"
                            label="Email"
                            name="email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                        />
                      </Grid>
                      
                      <Grid item xs={6} sm={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            value={phone}
                            label="Phone"
                            name="phone"
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                              margin="normal"
                              required
                              fullWidth
                              value={address1}
                              id="address"
                              label="Address"
                              name="address"
                              onChange={(e) => {
                                setAddress1(e.target.value);
                              }}
                          />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                              margin="normal"
                              required
                              fullWidth
                              value={address2}
                              id="street 1"
                              label="Street"
                              name="address2"
                              onChange={(e) => {
                                setAddress2(e.target.value);
                              }}
                          />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="city"
                              value={city}
                              label="City"
                              name="city"
                              onChange={(e) => {
                                setCity(e.target.value);
                              }}
                          />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                      <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={postalCode}
                            id="zipcode"
                            label="Zipcode"
                            name="postalCode"
                            onChange={(e) => {
                              setPostalCode(e.target.value);
                            }}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                      <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={country}
                            id="country"
                            label="Country"
                            name="country"
                            onChange={(e) => {
                              setCountry(e.target.value);
                            }}
                        /> </Grid>
                       
                        <Grid item xs={2} sm={6} mt={2}>
                        <FormControlLabel
                            control={<Checkbox  
                            onChange={(e) => {
                              setIsHeadauator(e.target.value);
                            }} 
                            name="headquater" value={isHeadauator} />}
                            label="Company Headquater Office"
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        />
                           
                        </Grid>
                        <Grid item xs={6} sm={6}>
                        <Button variant="contained" component="label"  sx={{ mb: 3 }}>
                            Upload Logo
                            <input name='logo' hidden accept="image/*" multiple type="file"  />
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
                        Update
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
export default function Edit() {
  return <CompanyEdit />;
}