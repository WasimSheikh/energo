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
import { Link, useNavigate, useParams } from "react-router-dom";
import { createCountry, getCountries, getCountry } from '../../redux/store/reducers/slices/UserSlice';
import { store } from '../../redux/store';
import React, { useState ,useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { toast } from 'react-toastify';


const mdTheme = createTheme();

export default function CountiesAdd() {

  const navigate = useNavigate();
  const params = useParams();
  const [name,setName] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const [country, setCountry] = useState('');
  const [onload,setOnload] = useState(false);
  const [dirtyFields, setDirtyFields] = useState({
    name: false,
  });

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
const isValidData = ():boolean => {
  const validateFields = ifEmpty( name );
  return validateFields;
};
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if(isValidData()){
    const formData = {
      title:name,
    }
    store.dispatch(createCountry(formData)).then((res: any) => {
     
      if (res.payload.status == true) {
        toast.success(res.payload.message)
        navigate("/countries");
      } else {
        toast.error(res.payload?.message);
      }
    });           
  };
  }
  
  useEffect(() => {
    if(params.countriesId != null){
      const formData ={
        country_id:params.countriesId
      }
      store.dispatch(getCountry(formData)).then((res: any) => {
        if (res.payload.status == 'true') {
          setCountry(res.payload.country);
        }else{
          toast.error(res.payload.message)
        }
      });
    }
  },[]);

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
                Add Country
                </Typography>
                <Divider />
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <Grid container spacing={2} rowSpacing={1} >
                      <Grid item xs={6} sm={6} mt={2}>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            margin="normal"
                            id="title"
                            required
                            name="Country"
                            label="Country"
                            fullWidth
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                name: !ifEmpty(e.target.value),
                              }));
                            }}
                          />
                            {dirtyFields["name"] && getError("Country is requried")}
                      </Grid>
                      </Grid>
                      </Grid>
                      <Divider />
                      <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
                        <Button  disabled={!isValidData()} type="submit" variant="contained">
                        Submit
                        </Button>
                        <Button variant="contained" component={Link} to="/countries" sx={{ ml: 1 }} >Cancel </Button>
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
// export default function Add() {
//   return <PermissionAdd />;
// }