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
import { Link,useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { store } from '../../redux/store';
import { deleteUser,getUsers, statusUpdate } from '../../redux/store/reducers/slices/UserSlice';
import React, { useEffect , useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
// import { Link , useParams ,useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';






function UserList() {

  const [users,setUsers] = useState([]);

  const userList = ()=>{
    store.dispatch(getUsers()).then((res: any) => {
      if (res && res.payload.users) {
        setUsers(res.payload.users);
      } 
    }); 
  }

  useEffect(() => {
    if(users.length == 0){
      userList();
    }
  },[]);

  
// aad delete function inside to main component function 

const deleteId=(e:any)=>{



  Swal.fire({
    title: 'Are you sure want to delete?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes , confirm !'
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch(deleteUser(e)).then((res: any) => {
        console.log(res.payload.message,"result");
        if(res.payload.status == true){
          toast.success(res.payload.message)
          setUsers([]);
          userList();
        }else{
          toast.error(res.payload.message)
        }
      }); 
    }
  })
}

const mdTheme = createTheme();
const columns: GridColDef[] = [
  { field: 'id',
   headerName: 'S.No.',
    width: 70,
    renderCell: (index:any) => index.api.getRowIndex(index.row.id) + 1,
  },
  {
    field: 'company_name',
    headerName: 'Company Name',
    width: 170,
  },
  {
    field: 'first_name',
    headerName: 'First Name',
    width: 170,
  },
  {
    field: 'last_name',
    headerName: 'Last Name',
    width: 160,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 150,
  },
  {
    field: 'is_active',
    headerName: 'Status',
    width: 90,
    sortable: false,
    renderCell: (params) => {
      return (
        <>
            {params.row.is_active == '1' && <a href='#'  onClick={()=>{statusUpdateUser(params.row.id)}}  > <span className='badge badge-success'>active</span></a>}
    {params.row.is_active == '0' &&  <a href='#'  onClick={()=>{statusUpdateUser(params.row.id)}}  > <span className='badge badge-danger'>Inactive</span></a>}
    </>
      );
   }
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 150,
    sortable: false,
    renderCell: (params) => {
    return (
        <>
          <Button  sx={{ minWidth: 40 }}  component={Link}  to={'/users/edit/'+params.row.id}  > <EditIcon  /> </Button>
          <Button  sx={{ minWidth: 40 }}   component={Link} to={'/users/view/'+params.row.id}  > <VisibilityIcon  /> </Button>
                <Button onClick={()=>{deleteId(params.row.id)}}  sx={{ minWidth: 40 }}   > <DeleteIcon  /> </Button>

        </>
      );
   }
  },
];

const statusUpdateUser=(e:any)=>{
  const formData= {
    id : e
  }
  console.log(e,"formData",formData);
    store.dispatch(statusUpdate(formData)).then((res: any) => {
    if(res.payload.status==true){
     toast.success(res.payload.message);
     setUsers([]);
     userList();
    }else{
         toast.error(res.payload.message);
    }
  }); 
}
// aad delete function inside to main component function 

 
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
                    rows={users}
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
  return <UserList />;
}
