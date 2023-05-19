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

import { Link, useNavigate } from "react-router-dom";
import { createCompany, createVessel, getCompanies } from '../../redux/store/reducers/slices/UserSlice';
import { store } from '../../redux/store';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import MenuItem from '@mui/material/MenuItem';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



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
  const [state, setState] = useState('')
  const [company_id,setCompanyId] = useState('');
  const [logo, setLogo] = useState();
  const [isHeadauator, setIsHeadauator] = useState('');
  const [companies, setCompanies] = React.useState([]);
  const [errorMessages, setErrorMessages] = useState('');
  const [dirtyFields, setDirtyFields] = useState({
    
    companyName:false,
    state:false
  });
  const isValidData = ():boolean => {
    const validateFields = ifEmpty( companyName && website && phone && address && street && city && country && email && postalCode && isHeadauator );
    return validateFields;
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
   {
    const formData = {
      title: state,
      company_id: company_id,
      picture: phone,
     
    }
    console.log(formData, 'formdata')
  store.dispatch(createVessel(formData)).then((res: any) => {
      if (res.payload.status == true) {
        toast.success(res.payload?.message)
        navigate("/companies");
      } else {
        toast.error(res.payload?.message)
      }
    });
  };
}
useEffect(() =>{
  store.dispatch(getCompanies()).then((res: any) => { 
    if (res && res.payload.companies) {
      setCompanies(res.payload.companies);
    } 
 }); 
}, [])
const selectChange = (event: SelectChangeEvent) => {
  setCompanyId(event.target.value);
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Edit Vessel
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
                        value={company_id}
                        label="Company Name"
                        onChange={selectChange}
                        onBlur={(e) =>{
                          setDirtyFields((dirty) => ({
                              ...dirty,
                              companyName: false,
                          }));
                        }}
                      >
                      <MenuItem value="">-Select-</MenuItem>
                          {companies.map((opt:any) => (  
                            <MenuItem key={opt.id} value={opt.id}>
                            {opt.title}
                            </MenuItem>
                          ))} 
                       </Select>
                    </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="country"
                          label="tittle"
                          name="country"
                          onChange={(e) => {
                            setState(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              country: !ifEmpty(e.target.value),
                            }));
                          }}
                        />

                        

                      </Grid>
                     
                     
                 
                        <Grid item xs={6} sm={6}>
                        <Button variant="contained" component="label"  sx={{ mb: 3, mt:3 }}>
                            Upload Logo
                            <input name='logo'   hidden accept="image/*" multiple type="file"  />
                          </Button>
                        </Grid>
                       
                    </Grid>
                    <Divider />
                      <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
                      <Button 
                        onClick={handleSubmit}
                          type="submit"
                          variant="contained"
                        >
                        Update
                      </Button>
                      <Button variant="contained" component={Link} to="/vessel" sx={{ ml: 1 }} >Cancel </Button>
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
