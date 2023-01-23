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
import { deleteCity, deleteState, getRolehasPermissions, getStates,statusCity, statusState } from '../../redux/store/reducers/slices/UserSlice';
import React, { useEffect , useState } from 'react';
import { store } from '../../redux/store';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { randomInt, randomUserName } from '@mui/x-data-grid-generator';



export default function StatesList() {
  const [cities,setCities] = useState([]);
  const [statesAdd,setStatesAdd] = useState(false);
  const [statesEdit,setStatesEdit] = useState(false);
  const [statesDelete,setStatesDelete] = useState(false);


function getStateList(){
    store.dispatch(getStates()).then((res: any) => {
      if (res.payload.status == true) {
        setCities(res.payload?.states);
      }else{
        toast.error(res.payload.message)
      }
     
    }); 
}

function addPermission(){
  var role_id:any = localStorage.getItem('role_id')
  const formData={
    role_id:role_id
  }
  store.dispatch(getRolehasPermissions(formData)).then((res: any) => {
      var allPermission:any = res.payload.data
      allPermission.forEach((per:any) => {
        if(per.flag == "States"){
          console.log(per,"777777");
          if(per.name == "Add"){
            console.log(per.name ,"addd")
            setStatesAdd(true)
          }else if(per.name == "Edit"){
            setStatesEdit(true)
          }else if(per.name == "Delete"){
            setStatesDelete(true)
          }
        }
      });
   
  }); 
  setTimeout(() => {
    console.log(statesAdd,statesEdit,statesDelete);
  }, 3000);
}

  useEffect(() => {
    getStateList();
    addPermission();
  },[]);

  const mdTheme = createTheme();
  const columns: GridColDef[] = [
    {
      field: 'S.No',
      headerName: 'S.No.',
      width: 100,
      renderCell: (index:any) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: 'country',
      headerName: 'Country',
      width: 250,
      renderCell:(params:any)=>{
        return(
          <div>{params.row.country.title}</div>
        )
      }
    },
    {
      field: 'name',
      headerName: 'State',
      width: 250,
    },
    {
        field: 'is_active',
        headerName: 'Status',
        width: 250,
        sortable: false,
        renderCell: (params) => {
          return (
            <>
        {params.row.is_active == '1' && <button type="button" className="btn btn-link"  onClick={()=>{statusUpdateCity(params.row.id)}} ><span className='badge badge-success'>Active</span></button>}
          {params.row.is_active == '0' &&  <button type="button" className="btn btn-link"  onClick={()=>{statusUpdateCity(params.row.id)}} ><span className='badge badge-danger'>Inactive</span></button>}
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
          {statesEdit == true && <Button  sx={{ minWidth: 40 }}  component={Link} to={'edit/'+params.row.id} > <EditIcon  /> </Button>}
          {statesDelete == true && <Button  sx={{ minWidth: 40 }}   onClick={()=>{deleteStateById(params.row.id)}}> <DeleteIcon  /> </Button>}
          </>
        );
     }
    },
  ];
  
  const deleteStateById=(e:any)=>{
      const formData ={
        state_id :e
      }
        Swal.fire({
          title: 'Are you sure want to delete?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes , confirm !'
        }).then((result:any) => {
          if (result.isConfirmed) {
            store.dispatch(deleteState(formData)).then((res: any) => {
              if(res.payload.status==true){
                setCities((prevRows : any) => {
                  const rowToDeleteIndex = randomInt(0, prevRows.length - 1);
                  return [
                    ...cities.slice(0, rowToDeleteIndex),
                    ...cities.slice(rowToDeleteIndex + 1),
                  ];
                });
               toast.success(res.payload.message);
              }else{
                  toast.error(res.payload.message);
              }
            }); 
          }
        })
      }

      const statusUpdateCity=(e:any)=>{
        const formData= {
          state_id : e
        }
          store.dispatch(statusState(formData)).then((res: any) => {
          if(res.payload.status==true){
           toast.success(res.payload.message);  
            getStateList();
          }else{
               toast.error(res.payload.message);
          }
        }); 
      }
  
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
                    States 
                  </Typography>
                  {statesAdd == true && <Button variant="contained" component={Link} to="/states/add">Add</Button>}
                </Box>
                <Divider />
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={cities}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    className="text-capitalize"
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
// export default function Listing() {
//   return <CityList />;
// }