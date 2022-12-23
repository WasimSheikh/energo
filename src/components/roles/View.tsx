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
import { createRole, getPermissionParentChlid, getRole, createRolehasPermission } from '../../redux/store/reducers/slices/UserSlice';
import { store } from '../../redux/store';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function CompanyView() {
  const mdTheme = createTheme();
  const params = useParams();
  const [id,setId] = useState('');
  const [permissionsId,setPermissionsId] = useState([]);
  const [title,setTitle] = useState('');
  const [permissions,setPermissions] = useState([]);
  const [onload,setOnload] = useState(false);
  const [errorMessages, setErrorMessages] = useState('');

  useEffect(() => {
    if(onload==false){
      const roleId = window.location.href.split('/')[5]
        const formData = {id:roleId};  
        store.dispatch(getRole(formData)).then((res: any) => {
          setOnload(true);
            if (res && res.payload) {
                setId(res.payload.role?.id);
                setTitle(res.payload.role?.name);
            } 
        }); 
        store.dispatch(getPermissionParentChlid()).then((res: any) => {
          if (res && res.payload?.permissionparent) {
            console.log(res.payload.permissionparent[0].chlid,"::::::::::::::::::",res.payload.permissionparent,"___________",res.payload.permissionparent[0]);
            setPermissions(res.payload?.permissionparent);
          } 
        }); 
      }
  });

  // const handleChange = (value:any) => { 
  //   let array = permissionsId;
  // //  array.push(value);
  //   //setPermissionsId(array);
  // }; 

  const theme = useTheme();
  const handleSubmit = (e:any) => {
    e.preventDefault();
    const formData = {
      id:id,
      permissions_id:permissionsId,
    }
    store.dispatch(createRolehasPermission(formData)).then((res: any) => {
      if (res.payload.status == true) {
        setErrorMessages('');
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
                 View Role
                </Typography>
                <Divider />
                  <Box sx={{ mt: 1 }} component="form" noValidate onSubmit={handleSubmit}>
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
                          {permissions.map((permission:any) => (  
                            <>
                            <Grid>
                              <FormControlLabel
                                  control={<Checkbox  
                                  name={permission.name} value={permission.id} />}
                                  label={permission.name}
                                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                              />
                            </Grid>
                            {permission.chlid.map((value:any) => (
                              <Grid  sx={{ ml: 5 }}>
                              {/* <input type="checkbox"  ></input> */}
                              <FormControlLabel
                                  control={<Checkbox  
                                  name={value.name} value={value.id} />}
                                  label={value.name}
                                  onChange={(e) => {
                                    //handleChange(value.id);
                                  }} 
                                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                              />
                              </Grid>
                            ))} 
                            </>
                            ))} 
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
  return <CompanyView/>;
}