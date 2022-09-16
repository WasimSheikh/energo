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
//import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { store } from '../../redux/store';
import { getUsers } from '../../redux/store/reducers/slices/UserSlice';
import React, { useEffect, useState } from 'react';


const mdTheme = createTheme();
// Generate Order Data
// function createData(
//   id: number,
//   companyName: string,
//   firstName:string,
//   lastName:string,
//   email: string,
//   phone: string,
//   country: string,
//   action: string,
// ) {
// return { id, companyName, firstName, lastName, email, phone, country, action };
// }


// const rows1 = [
//   createData(0, 'Company 1', 'First', 'Name 1', 'Company1gmail.com','1111111111', 'Country1','Edit/View'),
//   createData(1,'Company 2', 'First',  'Name 1', 'Company2gmail.com', '222222222', 'Country2','Edit/View'),
//   createData(2, 'Company 3', 'First', 'Name 1', 'Company3gmail.com', '333333333', 'Country3', 'Edit/View'),
//   createData(3, 'Company 4', 'First', 'Name 1', 'Company4gmail.com', '444444444', 'Country3', 'Edit/View'),
//   createData(4, 'Company 5', 'First', 'Name 1', 'Company5gmail.com', '555555555', 'Country5', 'Edit/View'),
// ];


const columns: GridColDef[] = [
  { field: 'id',
   headerName: 'ID',
    width: 70
  },
  {
    field: 'companyName',
    headerName: 'Company Name',
    width: 140,
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    width: 140,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    width: 140,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 155,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 140,
  },
  
  {
    field: 'country',
    headerName: 'Country',
    width: 140,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
    sortable: false,
    
  },
];
let rows:any =[];

useEffect(() => {
    const getUser = () => {
      store.dispatch(getUsers()).then((res: any) => {
        if (res && res.payload) {
          console.log(res);
          rows =res;
        } 
      });
    };
});

function UserList() {
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
                    Users 
                    </Typography>
                    <Button variant="contained" component={Link} to="/users/add">Add</Button>
                </Box>
                <Divider />
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </Box>
                  {/* <Table size="small">
                    <TableHead>
                      <TableRow>
                          <TableCell>Company Name</TableCell>
                          <TableCell>First Name</TableCell>
                          <TableCell>Last Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Phone</TableCell>
                          <TableCell>Country</TableCell>
                          <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                       <TableRow key={row.id}>
                          <TableCell>{row.companyName}</TableCell>
                          <TableCell>{row.firstName}</TableCell>
                          <TableCell>{row.lastName}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>{row.country}</TableCell>
                          <TableCell align="right">{row.action}</TableCell>
                          
                     </TableRow>
                      ))}
                    </TableBody>
                  </Table> */}
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
  return <UserList />;
}