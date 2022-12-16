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
import { updateUser, getUser, getCompanies } from '../../redux/store/reducers/slices/UserSlice';

const mdTheme = createTheme();




function UserEdit() {
  const navigate = useNavigate();
  const mdTheme = createTheme();
  const theme = useTheme();
  const params = useParams();
  const [id,setId] = useState('');
  const [company_id,setCompanyId] = useState('');
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
  const [permission, setPermission] = useState('');
  const [globalUser, setGlobalUser] = useState('');
  const [onload,setOnload] = useState(false);
  const [errorMessages, setErrorMessages] = useState('');
  const [companies, setCompanies] = React.useState([]);

  const [checkbox, setCheckbox] = useState('');

  
  const [dirtyFields, setDirtyFields] = useState({
    company_id: false,
  });




  const selectChange = (event: SelectChangeEvent) => {
    setCompanyId(event.target.value);
  };

  const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPermission((event.target as HTMLInputElement).value);
  };
    
  const handleSubmit = (e:any) => {
    e.preventDefault();
    const formData = {
      id:id,
      company_id:company_id,
      first_name: firstName,
      last_name:lastName,
      global_user:globalUser,
      phone:phone,
      email:email,
      address:address1,
      street:street,
      city:city,
      country:country,
      zipcode:postalCode,
      password:password,
      permission: permission,
    }     
    store.dispatch(updateUser(formData)).then((res: any) => {
      console.log(res)
      if(res.payload.status == true){
        setErrorMessages('');
        navigate("/users");
      }else{
        setErrorMessages(res.payload?.message);
      }
    });                                     
  };

  useEffect(() => {
    if(onload==false){
      const userId = window.location.href.split('/')[5]
      const formData = {id:userId};  
      store.dispatch(getUser(formData)).then((res: any) => {
          setOnload(true);
          if(res && res.payload){
              setId(res.payload.user?.id);
              setCompanyId(res.payload.user?.company_id);
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
              setPassword(res.payload.user?.password);
              setGlobalUser(res.payload.user?.globalUser);
          } 
      }); 
      store.dispatch(getCompanies()).then((res: any) => { 
        if (res && res.payload.companies) {
          setCompanies(res.payload.companies);
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
                 Edit User
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
                      <Grid item xs={2} sm={6} mt={2}>
                      <FormControlLabel
                            control={<Checkbox  
                            onChange={(e) => {
                              setGlobalUser(e.target.value);
                            }} 
                            name="global_user" value="yes" />}
                            label="Global User"
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        />
                      </Grid>
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
                            }}
                          />
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
                              }}
                        />
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
                              }}
                        />
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
                              }}
                        />
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
                            }}
                        />
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
                            }}
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
                            value={email}
                            label="Email"
                            name="email" 
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }} 
                        />
                          <FormControlLabel
                            control={<Checkbox  
                            onChange={(e) => {
                              setCheckbox (e.target.value);
                            }} 
                            id='checkbx'
                            name="Do you want to change password ?" />}
                            label="Do you want to change password ? "
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        value=""
                        label="Password"
                        type="text"
                        id="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }} 
                      />
                      </Grid>
                      <Grid item xs={6} >
                          <Typography component="h6" color="primary" variant="h6" sx={{ mt: 2 }}  gutterBottom>
                            Roles/Permission
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={permission}
                                    onChange={radioChange}
                                  >
                                    
                                  <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                                  <FormControlLabel value="author" control={<Radio />} label="Author" />
                                </RadioGroup>
                            </FormControl>
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
  return <UserEdit />;
}
