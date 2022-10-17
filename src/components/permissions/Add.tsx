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
import { Link, useNavigate } from "react-router-dom";
import { createPermission, createRole, getPermissionParent } from '../../redux/store/reducers/slices/UserSlice';
import { store } from '../../redux/store';
import React, { useState ,useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const mdTheme = createTheme();

function PermissionAdd() {

  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [parent,setParent] = useState('');
  const [url,setUrl] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [onload,setOnload] = useState(false);
  

  const selectChange = (event: SelectChangeEvent) => {
    setParent(event.target.value);
  };
 
  const handleSubmit = (e:any) => {
    e.preventDefault();
    const formData = {
      name:name,
      url:url,
      parent:parent,
      guard_name:'web',
    }
    store.dispatch(createPermission(formData)).then((res: any) => {
      if (res.payload.status == true) {
        setErrorMessages('');
        navigate("/permissions");
      } else {
        setErrorMessages(res.payload?.message);
      }
    });           
  };

  useEffect(() => {
    if(onload==false){
      setOnload(true);
      store.dispatch(getPermissionParent()).then((res: any) => {
        if (res && res.payload?.permissionparent) {
          setPermissions(res.payload?.permissionparent);
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
                Add Permission
                </Typography>
                <Divider />
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <Grid container spacing={2} rowSpacing={1} >
                      <Grid item xs={6} sm={6} mt={2}>
                          <FormControl fullWidth >
                          <InputLabel id="parent">Category</InputLabel>
                          <Select
                            labelId="parent"
                            required
                            id="parent"
                            value={parent}
                            label="Parent Category"
                            onChange={selectChange}
                          >
                          <MenuItem value="">-Select-</MenuItem>
                            {permissions.map((opt:any) => (  
                              <MenuItem key={opt.id} value={opt.id}>
                              {opt.name}
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
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                      </Grid>
                      <Grid item xs={12} sm={12} sx={{ mb: 2}}>
                          <TextField
                            margin="normal"
                            id="url"
                            required
                            name="url"
                            label="Url"
                            fullWidth
                            value={url}
                            onChange={(e) => {
                              setUrl(e.target.value);
                            }}
                          />
                      </Grid>
                      </Grid>
                      </Grid>
                      <Divider />
                      <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
                        <Button type="submit" variant="contained">
                        Submit
                        </Button>
                        <Button variant="contained" component={Link} to="/permissions" sx={{ ml: 1 }} >Cancel </Button>
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
  return <PermissionAdd />;
}