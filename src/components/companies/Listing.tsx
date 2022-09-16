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
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const mdTheme = createTheme();

// Generate Order Data
// function createData(
//   id: number,
//   companyName: string,
//   email: string,
//   phone: string,
//   website: string,
//   country: string,
//   action: string,
// ) {
//   return { id, companyName, email, phone, website, country, action };
// }

//const rows1 = [
//   createData(
//     0,
//     'Company 1',
//     'Company1gmail.com',
//     '1111111111',
//     'test1.com',
//     'Country1',
//     'Edit/View'
//   ),
//   createData(
//     1,
//     'Company 2',
//     'Company2gmail.com',
//     '222222222',
//     'test2.com',
//     'Country2',
//     'Edit/View'
//   ),
//   createData(2, 'Company 3', 'Company3gmail.com', '333333333', 'test3.com', 'Country3', 'Edit/View'),
//   createData(3,
//     'Company 4',
//     'Company4gmail.com',
//     '444444444',
//     'test4.com',
//     'Country3',
//     'Edit/View'
//   ),
//   createData(
//     4,
//     'Company 5',
//     'Company5gmail.com',
//     '555555555',
//     'test5.com',
//     'Country5',
//     'Edit/View'
//   ),
// ];

const columns: GridColDef[] = [
  { field: 'id',
   headerName: 'ID',
    width: 90
  },
  {
    field: 'companyName',
    headerName: 'Company Name',
    width: 160,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 160,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 160,
  },
  {
    field: 'website',
    headerName: 'Website',
    width: 160,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'country',
    headerName: 'Country',
    width: 147,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 150,
    sortable: false,
    
  },
];
const rows = [
  { id: 1, companyName: 'Snow 1', email: 'Jon1@gmail.com',  phone: '1111111111', website: 'test1.com', country: 'country1', action: 'Edit/View'  },
  { id: 2, companyName: 'Snow 2', email: 'Jon2@gmail.com',  phone: '2222222222', website: 'test2.com', country: 'country1', action: 'Edit/View'  },
  { id: 3, companyName: 'Snow 3', email: 'Jon3@gmail.com',  phone: '3333333333', website: 'test3.com', country: 'country1', action: 'Edit/View'  },
  { id: 4, companyName: 'Snow 4', email: 'Jon4@gmail.com',  phone: '4444444444', website: 'test4.com', country: 'country1', action: 'Edit/View'  },
  { id: 5, companyName: 'Snow 5', email: 'Jon5@gmail.com',  phone: '5555555555', website: 'test5.com', country: 'country1', action: 'Edit/View'  },
  { id: 6, companyName: 'Snow 6', email: 'Jon6@gmail.com',  phone: '6666666666', website: 'test6.com', country: 'country1', action: 'Edit/View'  },
  { id: 7, companyName: 'Snow 7', email: 'Jon7@gmail.com',  phone: '7777777777', website: 'test7.com', country: 'country1', action: 'Edit/View'  },
  { id: 8, companyName: 'Snow 8', email: 'Jon8@gmail.com',  phone: '8888888888', website: 'test8.com', country: 'country1', action: 'Edit/View'  },
  { id: 9, companyName: 'Snow 9', email: 'Jon9@gmail.com',  phone: '9999999999', website: 'test9.com', country: 'country1', action: 'Edit/View'  },
];

function CompanyList() {
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
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Website</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.companyName}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>{row.website}</TableCell>
                          <TableCell>{row.country}</TableCell>
                          <TableCell align="right">{`${row.action}`}</TableCell>
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
  return <CompanyList />;
}