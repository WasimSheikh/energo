import {createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import Header from '../common/Header';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { getPermissions } from '../../redux/store/reducers/slices/UserSlice';
import React, { useEffect , useState } from 'react';
import { store } from '../../redux/store';

const mdTheme = createTheme();
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Id',
    width: 100
  },
  {
    field: 'parent',
    headerName: 'Parent Category',
    width: 170,
  },
  {
    field: 'name',
    headerName: 'Title',
    width: 200,
  },
  {
    field: 'url',
    headerName: 'Url',
    width: 370,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 150,
    sortable: false,
    renderCell: (params) => {
      return (
        <>
        <Button  sx={{ minWidth: 40 }}  component={Link} to={'/permissions/edit/'+params.row.id} > <EditIcon  /> </Button>
        <Button  sx={{ minWidth: 40 }}   component={Link} to={'/permissions/view/'+params.row.id} > <DeleteIcon  /> </Button>
        </>
      );
   }
  },
];

function CompanyList() {
  const [permissions,setPermissions] = useState([]);
  useEffect(() => {
    if(permissions.length == 0){
      store.dispatch(getPermissions()).then((res: any) => {
        if (res && res.payload?.permissions) {
          setPermissions(res.payload?.permissions);
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
                <Box className="headingbutton" sx={{ mb: 1 }}>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Permissions 
                  </Typography>
                  <Button variant="contained" component={Link} to="/permissions/add">Add</Button>
                </Box>
                <Divider />
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={permissions}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                  />
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
export default function Listing() {
  return <CompanyList />;
}