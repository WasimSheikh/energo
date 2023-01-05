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
import { Link, useParams ,useNavigate} from "react-router-dom";
import { updateRole, getRole } from '../../redux/store/reducers/slices/UserSlice';
import { store } from '../../redux/store';
import React, { useEffect, useState } from 'react';

const mdTheme = createTheme();

function RoleEdit() {
    const navigate = useNavigate();
    const params = useParams();
    const [id,setId] = useState('');
    const [title,setTitle] = useState('');
    const [onload,setOnload] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');
    const [dirtyFields, setDirtyFields] = useState({
      title: false,
       
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
   
    const validateFields = ifEmpty(title);
    
    return validateFields;
  };
    const handleSubmit = (e:any) => {
        e.preventDefault();
        if(isValidData()){
        const formData = {
          id:id,
          name:title
        }  
        store.dispatch(updateRole(formData)).then((res: any) => {
          if(res.payload.status == true){
            setErrorMessages('');
            navigate("/roles");
          }else{
            setErrorMessages(res.payload?.message);
          }
        });           
  };
    }
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
                Edit Company
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
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                title: !ifEmpty(e.target.value),
                              }));
                            }}
                          />
                            {dirtyFields["title"] && getError("Title is requried")}
                      </Grid>
                      </Grid>
                      <Divider />
                      <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
                          <Button disabled={!isValidData()}
                          type="submit"
                          variant="contained"
                        >
                        Update
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
export default function Edit() {
  return <RoleEdit />;
}