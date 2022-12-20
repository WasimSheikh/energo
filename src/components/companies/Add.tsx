import { createTheme, ThemeProvider } from '@mui/material/styles';
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
import { Link, useNavigate } from "react-router-dom";
import { createCompany } from '../../redux/store/reducers/slices/UserSlice';
import { store } from '../../redux/store';
import React, { useEffect, useState } from 'react';


const mdTheme = createTheme();

function CompanyAdd() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [logo, setLogo] = useState();
  const [isHeadauator, setIsHeadauator] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const [dirtyFields, setDirtyFields] = useState({
    email: false,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = {
      title: companyName,
      website: website,
      phone: phone,
      email: email,
      address: address,
      street: street,
      city: city,
      country: country,
      logo: logo,
      isHeadquater: isHeadauator,
      zipcode: postalCode,
    }
    store.dispatch(createCompany(formData)).then((res: any) => {
      console.log("my all data responce ", res);  
      if (res.payload.status == true) {
        setErrorMessages('');
        navigate("/companies");
      } else {
        setErrorMessages(res.payload?.message);
      }
    });
  };
  const renderErrorMessage = () =>
    errorMessages && (
      <div className="error">{errorMessages}</div>
    );
  
    const ifEmpty= (val: string): boolean => {
  
      return (val !== undefined && val.length > 0);// return true;
  }

  const getError = (msg: string): JSX.Element => {
    return (
      <span className="text-13 d-inline-block ml-1 text_13 text-danger">
        {msg}
      </span>
    );
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
            {renderErrorMessage()}
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
                          label="Company Name"
                          fullWidth
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
                          id="email"
                          label="Email"
                          name="email"
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              email: !ifEmpty(e.target.value),
                            }));
                          }}
                        />
                          {dirtyFields["email"] && getError("Email is requried")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="phone"
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
                          id="address"
                          label="Address"
                          name="address"
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="street 1"
                          label="Street"
                          name="address2"
                          onChange={(e) => {
                            setStreet(e.target.value);
                          }}
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
                          id="country"
                          label="Country"
                          name="country"
                          onChange={(e) => {
                            setCountry(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={2} sm={6} mt={2}>
                        <FormControlLabel
                          control={<Checkbox
                            onChange={(e) => {
                              setIsHeadauator(e.target.value);
                            }}
                            name="headquater" value="1" />}
                          label="Company Headquater Office"
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <Button variant="contained" component="label" sx={{ mb: 3 }}>
                          Upload Logo
                          <input type="file"  name='logo' hidden accept="image/*" multiple  />
                    </Button>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                      </Grid>
                    </Grid>


                    <Divider />
                    <Toolbar sx={{ ml: 0, pl: "0 !important" }}>
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
