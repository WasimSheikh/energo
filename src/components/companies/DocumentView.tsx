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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { Link } from "react-router-dom";
import { store } from '../../redux/store';
import { shareDocuments } from '../../redux/store/reducers/slices/UserSlice';
import { useState } from 'react';

const mdTheme = createTheme();

function ShareAdd() {
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [documents,setDocuments] = useState([]);
  const [errorMessages, setErrorMessages] = useState('');
  const cards = [1, 2];
  
  const handleSubmit = (event:any) => {
    event.preventDefault();
    const formData = {
      name:name,
      email:email,
      description:description,
      documents:documents
    } 
    store.dispatch(shareDocuments(formData)).then((res: any) => {
      if (res.payload.status == true) {
        setErrorMessages('');
        //const that = this.context.router.history.push("/dashboard");  
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
                Document View
                </Typography>
                <Divider />
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Grid container spacing={2} rowSpacing={1} >
                    <Grid item xs={12} sx={{ mb:'20px !important' }} >
                        Test
                    </Grid>
                </Grid>
                </Box>
                <Divider />
                <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
                    <Button variant="contained" component={Link} to="/companies/document/1" sx={{ ml: 1 }} >Cancel </Button>
                </Toolbar>
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
  return <ShareAdd />;
}