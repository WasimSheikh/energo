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
import { getCountries, createState, getState } from '../../redux/store/reducers/slices/UserSlice';
import { store } from '../../redux/store';
import React, { useState ,useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { toast } from 'react-toastify';


const mdTheme = createTheme();

export default function  StateAdd() {
  const params = useParams();
  const navigate = useNavigate();
  const [country_id,setCountry] = useState('');
  const [setSate,setState] = useState('');
  const [title,setTitle] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const [onload,setOnload] = useState(false);
  const [countries,setCountries] = useState([]);
  const [stateId,setStateId] = useState([]);
  const [dirtyFields, setDirtyFields] = useState({
    country_id: false,
    title:false,
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
  const validateFields = ifEmpty( title );
  
  return validateFields;
};
const selectCuntry = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
    console.log(event.target.value,"oooooooo")
    getCountryStatesByCountry(event.target.value);
  };
const selectState = (event:SelectChangeEvent) => {
    setState(event.target.value);
  };

function getCountrieData(){
    if(countries.length == 0){
      store.dispatch(getCountries()).then((res: any) => {
        console.log(res,"getCountrieData()")
          setCountries(res.payload.countries);
          
      });
    }
  }
function getCountryStatesByCountry(e:any){
    console.log(e,"event.target.value")
    const formDate={
        country_id:e
    }
  }


  const handleSubmit = (e:any) => {
    e.preventDefault();
    if(isValidData()){
    const formData = {
      country_id:country_id,
      name:title,
    }
    console.log(formData,'formData')
    store.dispatch(createState(formData)).then((res: any) => {
      if (res.payload.status == true) {
        toast.success(res.payload.message)
        navigate("/states");
      } else {
        toast.error(res.payload?.message);
      }
    });           
  };
  }

  function getStatesById(){
  const formData={
    state_id:params.cityId
  }
    store.dispatch(getState(formData)).then((res: any) => {
      setCountry(res.payload.state.country_id)
      setTitle(res.payload.state.name)
      console.log(res,'response')
    });  
  }

  useEffect(() => {
    getCountrieData();
    getStatesById();
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
                Add State
                </Typography>
                <Divider />
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <Grid container spacing={2} rowSpacing={1} >
                      <Grid item xs={6} sm={6} mt={2}>
                          <FormControl fullWidth >
                          <InputLabel id="Country">Country</InputLabel>
                          <Select
                            labelId="Country"
                            required
                            id="Country"
                            value={country_id}
                            label="Country"
                            onChange={selectCuntry}
                          >
                          <MenuItem value="">-Select-</MenuItem>
                            {countries.map((city:any) => (  
                              <MenuItem key={city.id} value={city.id}>
                              {city.title}
                              </MenuItem>
                            ))} 
                          </Select>
                        </FormControl>
                      
                        <Grid item xs={12} sm={12}>
                          <TextField
                            margin="normal"
                            id="title"
                            required
                            name="title"
                            label="Title"
                            fullWidth
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                title: !ifEmpty(e.target.value),
                              }));
                            }}
                          />
                            {dirtyFields["title"] && getError("Title is requried")}
                      
                      </Grid>
                      </Grid>
                      </Grid>
                      <Divider />
                      <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
                        <Button  disabled={!isValidData()} type="submit" variant="contained">
                        Submit
                        </Button>
                        <Button variant="contained" component={Link} to="/states" sx={{ ml: 1 }} >Cancel </Button>
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
