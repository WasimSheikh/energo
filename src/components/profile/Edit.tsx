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
import { Link , useParams ,useNavigate} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { store } from '../../redux/store';
import { updateUserProfile, getUser, getCompanies } from '../../redux/store/reducers/slices/UserSlice';

const mdTheme = createTheme();

function EditProfile() {

  const navigate = useNavigate();
  const mdTheme = createTheme();
  const theme = useTheme();
  const params = useParams();
  const [id,setId] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [address1,setAddress] = useState('');
  const [street,setStreet] = useState('');
  const [city,setCity] = useState('');
  const [country,setCountry] = useState('');
  const [password,setPassword] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [onload,setOnload] = useState(false);
  const [errorMessages, setErrorMessages] = useState('');
  const [changePassword, setChangePassword] =useState(false);
  const [boxValue,setBoxValue] = useState(false);

  const [dirtyFields, setDirtyFields] = useState({
    companyname:false,
    first_name:false,
    last_name:false,
    email:false,
    address:false,
    street:false,
    city:false,
    country:false,
    password:false,
    permission:false,
    postalCode:false,
    phone:false,
  
  });
  
  function showPassword(data:any){
    setChangePassword(data);
    if(data==false){
      setPassword('')
    }
    setBoxValue(data)
  }
  const isValidData = ():boolean => {
    const validateFields = ifEmpty( firstName && lastName && phone && address1 && street && city && country  && postalCode) && (changePassword==false || ifEmpty(password));
    return validateFields;
  };
  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if(isValidData()){
    const formData = {
      id:id,
      first_name: firstName,
      last_name:lastName,
      phone:phone,
      email:email,
      address:address1,
      street:street,
      city:city,
      country:country,
      zipcode:postalCode,
      password:password,
      change_password:changePassword,
    }   
  
    store.dispatch(updateUserProfile(formData)).then((res: any) => {
      if(res.payload.status == true){
        setErrorMessages('');
        navigate("/EditProfile");
      }else{
        setErrorMessages(res.payload?.message);
      }
    });                                     
  };
}
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

const user_id = localStorage.getItem('user_id')
  useEffect(() => {
    if(onload==false){
      const userId = user_id
      const formData = {id:userId};  
      store.dispatch(getUser(formData)).then((res: any) => {
          setOnload(true);
          
          if(res && res.payload){
              setId(res.payload.user?.id);
              setEmail(res.payload.user?.email);
              setPhone(res.payload.user?.phone);
              setAddress(res.payload.user?.address?.address);
              setStreet(res.payload.user?.address?.street);
              setFirstName(res.payload.user?.first_name);
              setLastName(res.payload.user?.last_name);
              setCity(res.payload.user?.address?.city);
              setCountry(res.payload.user?.address?.country);
              setPostalCode(res.payload.user?.address?.zipcode);
            
               
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
                 Profile
                </Typography>
                <Divider />
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                   <Grid container spacing={2} rowSpacing={1} >
                      
                      <Grid item xs={6} sm={6}>
                          <TextField
                            margin="normal"
                            id="first_name"
                            required
                            value={firstName}
                            name="first_name"
                            autoFocus
                            label="First Name"
                            fullWidth
                            onChange={(e) => {
                              setFirstName(e.target.value);
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                first_name: !ifEmpty(e.target.value),
                              }));
                            }}
                          />
                             {dirtyFields["first_name"] && getError("FirstName is requried")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                          <TextField
                            margin="normal"
                            id="last_name"
                            required
                            name="last_name"
                            value={lastName}
                            autoFocus
                            label="Last Name"
                            fullWidth
                            onChange={(e) => {
                              setLastName(e.target.value);
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                last_name: !ifEmpty(e.target.value),
                              }));
                            }}
                          />
                             {dirtyFields["last_name"] && getError("LastName is requried")}
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
                             setDirtyFields((dirty) => ({
                              ...dirty,
                              phone: !ifEmpty(e.target.value),
                            }));
                          }}
                        />
                           {dirtyFields["phone"] && getError("Phone is requried")}
                      </Grid>
                      <Grid item xs={6} sm={6}> 
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="address"
                              value={address1}
                              label="Address"
                              name="address1"
                              onChange={(e) => {
                                setAddress(e.target.value);
                                setDirtyFields((dirty) => ({
                                  ...dirty,
                                  address: !ifEmpty(e.target.value),
                                }));
                              }}
                            />
                               {dirtyFields["address"] && getError("Address is requried")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                              margin="normal"
                              required
                              fullWidth
                              value={street}
                              id="street 1"
                              label="Street"
                              name="address2"
                              onChange={(e) => {
                                setStreet(e.target.value);
                                setDirtyFields((dirty) => ({
                                  ...dirty,
                                  street: !ifEmpty(e.target.value),
                                }));
                              }}
                            />
                               {dirtyFields["street"] && getError("Street is requried")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                              margin="normal"
                              required
                              fullWidth
                              value={city}
                              id="city"
                              label="City"
                              name="city"
                              onChange={(e) => {
                                setCity(e.target.value);
                                setDirtyFields((dirty) => ({
                                  ...dirty,
                                  city: !ifEmpty(e.target.value),
                                }));
                              }}
                            />
                               {dirtyFields["city"] && getError("City is requried")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                      <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="zipcode"
                            value={postalCode}
                            label="Zipcode"
                            name="postalcode"
                            onChange={(e) => {
                              setPostalCode(e.target.value);
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                zipcode: !ifEmpty(e.target.value),
                              }));
                            }}
                          />
                             {dirtyFields["postalCode"] && getError("Zipcode is requried")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                      <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="country"
                            value={country}
                            label="Country"
                            name="country"
                            onChange={(e) => {
                              setCountry(e.target.value);
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                country: !ifEmpty(e.target.value),
                              }));
                            }}
                          />
                             {dirtyFields["country"] && getError("Country is requried")}
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
                            value={email}
                            label="Email"
                            name="email" 
                            InputProps={{
                              readOnly: true
                            }}
                    
                        />
                          <FormControlLabel
                            control={<Checkbox  
                            onChange={(e) => {
                              showPassword(e.target.checked);
                            }} 

                            id='checkbx'
                            value={changePassword}
                            name="Do you want to change password ?" />}
                            label="Do you want to change password ? "
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        />
                     
                      {boxValue &&  <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        value={password}
                        label="Password"
                        type="text"
                        id="password"
                        onChange={(e) => {
                          setPassword (e.target.value)
                          setDirtyFields((dirty) => ({
                            ...dirty,
                            password: !ifEmpty(e.target.value),
                          }));
                        }}
                      />
                      }
                        {dirtyFields["password"] && getError("Password is requried")}
                      
                      </Grid>
                     
                     </Grid>
                    
                    <Divider />
                      <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
                          <Button    disabled={!isValidData()}
                          type="submit"
                          variant="contained"
                        >
                        Update
                          </Button>
                        <Button variant="contained" component={Link} to="/users" sx={{ ml: 1 }} >Cancel</Button>
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
  return <EditProfile />;
}
