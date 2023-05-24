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
import { updateUser, getUser, getCompanies, getCountryStates, getCountries, getCities } from '../../redux/store/reducers/slices/UserSlice';
import { toast } from 'react-toastify';
import { ifEmpty } from '../utils/FormUtils';

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
  const [changePassword, setChangePassword] =useState(false);
  const [boxValue,setBoxValue] = useState(false);
  const [stateId, setStateId] = useState([]);
  const [cityId, setCityId] = useState([]);
  const [countries, setCountries] = useState([]);
  const [state, setState] = useState('')
  const [dirtyFields, setDirtyFields] = useState({
  first_name:false,
  companyname:false,
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

  const selectChange = (event: SelectChangeEvent) => {
    setCompanyId(event.target.value);
  };

  const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPermission((event.target as HTMLInputElement).value);
  };
  const isValidData = ():boolean => {
    const validateFields = ifEmpty( firstName && lastName && phone && address1 && street && city && email && country && company_id && permission && postalCode) && (changePassword==false || ifEmpty(password) );
    return validateFields;
  };
  function getCountryStatesByCountry(e: any) {
    const formDate = {
      country_id: e,
    };
    store.dispatch(getCountryStates(formDate)).then((res: any) => {
      setStateId(res.payload.states);
    });
  }
  const selectCuntry = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
    getCountryStatesByCountry(event.target.value);
  };

  const selectState = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };
  const selectCity = (event: SelectChangeEvent) => {
    setCity(event.target.value);
  };
  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if(isValidData()){
    const formData = {
      id:id,
      company_id:company_id,
      first_name: firstName,
      last_name:lastName,
      is_global:globalUser,
      phone:phone,
      email:email,
      address:address1,
      street:street,
      city:city,
      country:country,
      zipcode:postalCode,
      password:password,
      permission: permission,
      change_password:changePassword,
    }     
    store.dispatch(updateUser(formData)).then((res: any) => {
      if (res.payload.status == true) {
        toast.success(res.payload?.message)
        navigate("/users");
      } else {
        toast.error(res.payload?.message)
      }
    });                                     
  };

}

  function checkBoxValue(data:any){
    setGlobalUser(data.target.checked)
}
  const renderErrorMessage = () =>
  errorMessages && (
    <div className="error">{errorMessages}</div>
  );

  

const getError = (msg: string): JSX.Element => {
  return (
    <span className="text-13 d-inline-block ml-1 text_13 text-danger">
      {msg}
    </span>
  );
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
             // setPassword(res.payload.user?.password);
              setGlobalUser(res.payload.user?.globalUser);
              setState(res.payload.user?.address?.state);
              if(res.payload.user.is_global == '1'){
                (document.getElementById('checkBox')as any).checked = true;
               }else{
                (document.getElementById('checkBox')as any).checked = false;
               }

          } 
      }); 

      store.dispatch(getCompanies()).then((res: any) => { 
        if (res && res.payload.companies) {
          setCompanies(res.payload.companies);
        } 
     }); 
    }
   });
   function getCountrieData() {
    if (countries.length == 0) {
      store.dispatch(getCountries()).then((res: any) => {
        setCountries(res.payload.countries);
      });
    }
  }
  function getCityiesData() {
    
      store.dispatch(getCities()).then((res: any) => {
      setCityId(res.payload.cities);
      });
    
  }
   useEffect(() => {
    getCountrieData();
    getCityiesData();
  }, []);

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
                      <Grid item xs={6} sm={6} mt={4}>
                      <FormControlLabel
                            control={
                            // onChange={(e) => {
                            //   setGlobalUser(e.target.value);
                            // }} 
                            // name="global_user" value="yes" />}
                            // label="Global User"
                            // sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                            <input  type= 'checkbox' name="global_user" id = 'checkBox'  
                            onChange={(e) => {
                              checkBoxValue(e);
                            }}    />
                          }
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
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                first_name: !ifEmpty(e.target.value),
                              }));
                            }}
                          />
                             {dirtyFields["first_name"] && getError("firstName is requried")}
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
                             {dirtyFields["last_name"] && getError("lastName is requried")}
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
                      <Grid item xs={6} sm={6} mt={2}>
                        <FormControl fullWidth>
                          <InputLabel id="Country">Country</InputLabel>
                          <Select
                            labelId="Country"
                            required
                            id="Country"
                            value={country}
                            label="Country"
                            onChange={selectCuntry}
                          >
                            <MenuItem value="">-Select-</MenuItem>
                            {countries.map((city: any) => (
                              <MenuItem key={city.id} value={city.id}>
                                {city.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6} mt={2}>
                        <FormControl fullWidth>
                          <InputLabel id="State">State</InputLabel>
                          <Select
                            labelId="State"
                            required
                            id="State"
                            value={state}
                            label="State"
                            onChange={selectState}
                          >
                            <MenuItem value="">-Select-</MenuItem>
                            {stateId?.map((item: any) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={6} sm={6} mt={2}>
                        <FormControl fullWidth>
                          <InputLabel id="City">City</InputLabel>
                          <Select
                            labelId="City"
                            required
                            id="City"
                            value={city}
                            label="City"
                            onChange={selectCity}
                          >
                            <MenuItem value="">-Select-</MenuItem>
                            {cityId?.map((item: any) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
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
                            id="zipcode"
                            value={postalCode}
                            label="Zipcode"
                            name="postalcode"
                            onChange={(e) => {
                              setPostalCode(e.target.value);
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                postalCode: !ifEmpty(e.target.value),
                              }));
                            }}
                          />
                             {dirtyFields["postalCode"] && getError("PostalCode is requried")}
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
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                email: !ifEmpty(e.target.value),
                              }));
                            }}
                          />
                         
                          {dirtyFields["email"] && getError("Email is requried")}
                          
                          
                          <Grid item xs={12} >
                          <FormControlLabel
                            control={<Checkbox  
                            onChange={(e) => {
                              showPassword(e.target.checked);
                            }} 
                            id='checkbx'
                            name="Do you want to change password ?" />}
                            label="Do you want to change password ? "
                            // sx={{ : { fontSize: 28 } }}
                        />
                        </Grid>
                       
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
                      {dirtyFields["password"] && boxValue && getError("Password is requried")}
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
                                    onChange={radioChange}>
                                   <FormControlLabel value="admin" control={<Radio />}  label="Admin" />
                                  <FormControlLabel value="author" control={<Radio />} label="Author" />
                                </RadioGroup>
                            </FormControl>
                      </Grid>
                     </Grid>
                    <Divider />
                      <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
                      <Button 
                           disabled={!isValidData()}
                          type="submit"
                          variant="contained">
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
