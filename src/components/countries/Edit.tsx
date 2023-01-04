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
import { Link, useParams,useNavigate } from "react-router-dom";
import { getPermission, getPermissionParent, updatePermission } from '../../redux/store/reducers/slices/UserSlice';
import { store } from '../../redux/store';
import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const mdTheme = createTheme();
const names = [
  'Omar Alexander',
  'Users',
  'Dashboard',
  'Notification',
  'Security Managment'
];

export default function CountiesEdit() {
  
    const navigate = useNavigate();
    const params = useParams();
    const [id,setId] = useState('');
    const [title,setTitle] = useState('');
    const [parent,setParent] = useState('');
    const [url,setUrl] = useState('');
    const [onload,setOnload] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [dirtyFields, setDirtyFields] = useState({
      name: false,
      parent:false,
      url:false,
    });
    const selectChange = (event: SelectChangeEvent) => {
      setParent(event.target.value);
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
  const isValidData = ():boolean => {
    const validateFields = ifEmpty( title && url);
    return validateFields;
  };
    const handleSubmit = (e:any) => {
        e.preventDefault();
        if(isValidData()){
        const formData = {
          id:id,
          name:title,
          url:url,
          parent:parent
        }  
        store.dispatch(updatePermission(formData)).then((res: any) => {
            if (res.payload.status == true) {
              setErrorMessages('');
              navigate("/permissions");
            } else {
              setErrorMessages(res.payload?.message);
            }
        });           
  };
    }
  useEffect(() => {
    if(onload==false){
      setOnload(true);
      const permissionId = window.location.href.split('/')[5]
      const formData = {id:permissionId};  
        store.dispatch(getPermissionParent()).then((res: any) => {
          if (res && res.payload?.permissionparent) {
            setPermissions(res.payload?.permissionparent);
          } 
        });
        // store.dispatch(getPermission(formData)).then((res: any) => {
        //     if (res && res.payload) {
        //         setId(res.payload.permission?.id);
        //         setTitle(res.payload.permission?.name);
        //         setUrl(res.payload.permission?.url);
        //         setParent(res.payload.permission?.parent)
        //     } 
        // }); 
        
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
                Edit Permission
                </Typography>
                <Divider />
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <Grid container spacing={2} rowSpacing={1} >
                  <Grid item xs={6} sm={6} mt={2}>
                      <FormControl fullWidth >
                      <InputLabel id="company_name_label">Category</InputLabel>
                      <Select
                        labelId="parent"
                        required
                        id="parent"
                        value={parent}
                        label="Countries"
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
                      <Grid>
                          <TextField
                            margin="normal"
                            id="title"
                            required
                            name="title"
                            label="City"
                            fullWidth
                            value={title}
                            onChange={(e) => {
                              setTitle(e.target.value);
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                parent: !ifEmpty(e.target.value),
                              }));
                            }}
                          />
                            {dirtyFields["parent"] && getError("Title is requried")}
                      </Grid>
                      {/* <Grid item xs={12} sm={12} sx={{ mb: 2}}>
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
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                url: !ifEmpty(e.target.value),
                              }));
                            }}
                          />
                            {dirtyFields["url"] && getError("Url is requried")}
                      </Grid> */}
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
                      <Button variant="contained" component={Link} to="/countries" sx={{ ml: 1 }} >Cancel </Button>
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
// export default function Edit() {
//   return <PermissionEdit />;
// }