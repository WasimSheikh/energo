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
import { Link,useNavigate } from "react-router-dom";
import { createRole } from '../../redux/store/reducers/slices/UserSlice';
import { store } from '../../redux/store';
import React, { useState } from 'react';

const mdTheme = createTheme();

function RoleAdd() {

  const navigate = useNavigate();
  const [title,setTitle] = useState('');
  const [errorMessages, setErrorMessages] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const formData = {
      name:title,
      guard_name:'web'
    }
    store.dispatch(createRole(formData)).then((res: any) => {
      if (res.payload.status == true) {
        setErrorMessages('');
        navigate("/roles");
      } else {
        setErrorMessages(res.payload?.message);
      }
    });           
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
                Add Role
                </Typography>
                <Divider />
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <Grid container spacing={2} rowSpacing={1} >
                      <Grid item xs={6} sm={6} sx={{ mb: 2}}>
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
                            }}
                          />
                      </Grid>
                      </Grid>
                      <Divider />
                      <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
                          <Button
                          type="submit"
                          variant="contained"
                        >
                        Submit
                        </Button>
                        <Button variant="contained" component={Link} to="/roles" sx={{ ml: 1 }} >Cancel </Button>
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
  return <RoleAdd />;
}