import {createTheme, makeStyles, styled, ThemeProvider } from '@mui/material/styles';
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
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCompanies } from '../../redux/store/reducers/slices/UserSlice';
import React, { useEffect , useState } from 'react';
import { store } from '../../redux/store';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const mdTheme = createTheme();
const columns: GridColDef[] = [
  { field: 'id',
   headerName: 'Id',
    width: 60
  },
  {
    field: 'title',
    headerName: 'Company Name',
    width: 170,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 230,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 120,
  },
  {
    field: 'website',
    headerName: 'Website',
    width: 180,
    //valueGetter: (params: GridValueGetterParams) =>
    //`${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'is_active',
    headerName: 'Status',
    width: 90,
    valueGetter: (params: GridValueGetterParams) =>
    `${params.row.is_active || ''}`,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 180,
    sortable: false,
    renderCell: (params) => {
      return (
        <>
        <Button  sx={{ minWithd: 40 }}   component={Link} to={'/companies/edit/'+params.row.id} > <EditIcon  /> </Button>
        <Button  sx={{ minWidth: 40 }}  component={Link} to={'/companies/view/'+params.row.id} > <VisibilityIcon  /> </Button>
        <Button  sx={{ minWidth: 40 }}  component={Link} to={'/companies/delete/'+params.row.id} > <DeleteIcon  /> </Button>
        <Button  sx={{ minWidth: 40 }}  component={Link} to={'/companies/document/'+params.row.id} > <FileCopyIcon  /> </Button>
        </>
      );
   }
  },
];

function CompanyList() {
  const [companies,setCompanies] = useState([]);

  useEffect(() => {
    if(companies.length == 0){
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
                <Box className="headingbutton" sx={{ mb: 1 }}>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Companies 
                    </Typography>
                    <Button variant="contained" component={Link} to="/companies/add">Add</Button>
                </Box>
                <Divider />
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={companies}
                    columns={columns}
                    pageSize={5}
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
