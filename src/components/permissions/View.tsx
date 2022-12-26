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
import Button from '@mui/material/Button';
import { Link ,useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { getRole } from '../../redux/store/reducers/slices/UserSlice';
import { store } from '../../redux/store';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function CompanyView() {
  const mdTheme = createTheme();
  const params = useParams();
  const [id,setId] = useState('');
  const [title,setTitle] = useState('');

  const [onload,setOnload] = useState(false);

    useEffect(() => {
     if(onload==false){
        setOnload(true);
        const roleId = window.location.href.split('/')[5]
        const formData = {id:roleId};  
          store.dispatch(getRole(formData)).then((res: any) => {
              if (res && res.payload?.role) {
                  setId(res.payload.role?.id);
                  setTitle(res.payload.role?.name);
              } 
          }); 
      }
    });

  const theme = useTheme();

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
                 View Role
                </Typography>
                <Divider />
                  <Box sx={{ mt: 1 }}>
                    <Grid container spacing={2} rowSpacing={1} sx={{ mb: 2 }} >
                      <Grid item xs={6} sm={6}> 
                        <Box> Title : <Box component="span">{title}</Box></Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} rowSpacing={1} sx={{ mb: 2 }} >
                      <Grid item xs={6} sm={6}> 
                          <Typography component="h2" variant="h6" sx={{ mt: 1}} gutterBottom>
                            Permission
                          </Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
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
  return <CompanyView/>;
}