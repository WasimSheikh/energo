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
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { store } from '../../redux/store';
import { createUser,getCompanies } from '../../redux/store/reducers/slices/UserSlice';

const mdTheme = createTheme();

function UserAdd() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [company_id,setCompanyId] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('');
  const [street,setStreet] = useState('');
  const [city,setCity] = useState('');
  const [country,setCountry] = useState('');
  const [password,setPassword] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [profilePicture,setProfilePicture] = useState('files');
  const [permission, setPermission] = React.useState('');
  const [globalUser, setGlobalUser] = React.useState('');
  const [onload,setOnload] = useState(false);
  const [errorMessages, setErrorMessages] = useState('');
  const [companies, setCompanies] = React.useState([]);
   const [file, setFile] = useState();
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
  const getBase64 = (file:any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      console.log(reader.result,"11111111");
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e:any) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      var image = e.target.files[0]
      getBase64(image)
    }
  };


  const isValidData = ():boolean => {
    const validateFields = ifEmpty( firstName && lastName && phone && address && street && city && country && permission && postalCode );
    return validateFields;
  };

  const selectChange = (event: SelectChangeEvent) => {
    setCompanyId(event.target.value);
  };
  const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPermission((event.target as HTMLInputElement).value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if(isValidData()){
      const formData = {
        company_id:company_id,
        first_name: firstName,
        last_name:lastName,
        global_user:globalUser,
        phone:phone,
        email:email,
        address:address,
        street:street,
        city:city,
        country:country,
        password:password,
        permission: permission,
        zipcode:postalCode,
        profile_picture:file,   
      } 
      console.log(formData,'formData',email);
      store.dispatch(createUser(formData)).then((res: any) => {
        if(res.payload.status == true){
          setErrorMessages('');
          console.log(res,4544554)
          navigate("/users");
        }else {
          setErrorMessages(res.payload?.message);
        }
      });                               
    }else{
      console.log('sdfssff');
    }      

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
  useEffect(() => {

    isValidData();
    if(onload==false){
      setOnload(true);
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
                 Add User
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
                        autoFocus
                        value={company_id}
                        label="Company Name"
                        onChange={selectChange}
                        onBlur={(e) =>{
                          setDirtyFields((dirty) => ({
                              ...dirty,
                              company_id: false,
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
                            name="global_user" value={globalUser} />}
                            label="Global User"
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}  
                        />
                        
                      </Grid>
                      <Grid item xs={6} sm={6}>
                          <TextField
                            margin="normal"
                            id="first_name"
                            required
                            name="first_name"
                            
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
                      <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="country"
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
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
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
                      <Grid item xs={6} sm={6}>
                        {/* <Button variant="contained" component="label" sx={{ mb: 3 }}> */}
                     
                        <p>  Upload profile</p>
                          {/* <input type="file"  name='logo' hidden accept="image/*" multiple  /> */}
                          <input type="file"   name='file' onChange={handleFileChange}
                        />
                    {/* </Button> */}
                      </Grid>
                     </Grid>
                    
                    <Divider />
                      <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
                          <Button 
                           disabled={!isValidData()}
                          type="submit"
                          variant="contained"
                        >
                        Submit
                          </Button>
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
  return <UserAdd />;
}