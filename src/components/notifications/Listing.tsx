import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import Header from '../common/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const mdTheme = createTheme();

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'S.No',
    width: 140,
  },
  {
    field: 'title',
    headerName: 'Company Name',
    width: 140,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 140,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 140,
  },
  {
    field: 'website',
    headerName: 'Website',
    width: 140,
  },
  {
    field: 'country',
    headerName: 'Country',
    width: 140,
  },
  {
    field: 'active',
    headerName: 'Status',
    width: 100,
    sortable: false,
    renderCell: (params) => {
      return (
        <>
        <button type="button" className="btn btn-link" ><span className='badge badge-success'>Active</span></button>
        </>
      );
   }
  },
];
function NotificationList() {
  const [notification, setNotification] = React.useState([
    {
      "id": '1',
      'title': 'Company 1',
      "email": "Company1gmail.com",
      "phone": "0992664584",
      "website": "Company/status",
      "country": "country",
      "action": "active"
    },
    {
      "id": '2',
      'title': 'Company 2',
      "email": "Company2gmail.com",
      "phone": "0992664584",
      "website": "Company/status",
      "country": "country",
      "action": "active"
    },
    {
      "id": '3',
      'title': 'Company 3',
      "email": "Company3gmail.com",
      "phone": "0992664584",
      "website": "Company/status",
      "country": "country",
      "action": "active"
    },
    {
      "id": '4',
      'title': 'Company 4',
      "email": "Company4gmail.com",
      "phone": "0992664584",
      "website": "Company/status",
      "country": "country",
      "action": "active"
    }
  ])
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
                      Notifications
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={notification}
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
  return <NotificationList />;
}