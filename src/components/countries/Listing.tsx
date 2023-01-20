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
import { deleteCountry, getCountries, getPermissions, getRolehasPermissions, StatusCountry } from '../../redux/store/reducers/slices/UserSlice';
import React, { useEffect , useState } from 'react';
import { store } from '../../redux/store';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { randomInt, randomUserName } from '@mui/x-data-grid-generator';


export default function ContriesList() {
  const [countries,setCountries] = useState([]);
  const [countriesAdd,setCountriesAdd] = useState(false);
  const [countriesEdit,setCountriesEdit] = useState(false);
  const [countriesDelete,setCountriesDelete] = useState(false);
  const [countriesView,setCountriesView] = useState(false);

  

function getCountrieData(){
    store.dispatch(getCountries()).then((res: any) => {
      if (res.payload.status == true) {
        setCountries(res.payload.countries);
      }else{
        toast.error(res.payload.message)
      }
    });
  
}

function addPermission(){
  var role_id:any = localStorage.getItem('user_id')
  const formData={
    role_id:role_id == '1'? '1':'2'
  }
  store.dispatch(getRolehasPermissions(formData)).then((res: any) => {
      console.log(res.payload.data,"permission",res.payload.data.flag,"role",res.payload.data.name,"type");
      var allPermission:any = res.payload.data
      allPermission.forEach((per:any) => {
        if(per.flag == "Countries"){
          if(per.name == "Add"){
            setCountriesAdd(true)
          }else if(per.name == "Edit"){
            setCountriesEdit(true)
          }else if(per.name == "Delete"){
            setCountriesDelete(true)
          }
        }
      });
  }); 
}

  useEffect(() => {
    getCountrieData();
    addPermission();
  },[]);

  const mdTheme = createTheme();
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'S.NO.',
    width: 100,
    renderCell: (index:any) => index.api.getRowIndex(index.row.id) + 1,
  },
  {
    field: 'title',
    headerName: 'Countries',
    width: 500,
  },
  {
    field: 'is_active',
    headerName: 'Status',
    width: 200,
    sortable: false,
    renderCell: (params) => {
      return (
        <>
         {params.row.is_active == '1' && <div onClick={()=>{statusUpdateCountrie(params.row.id)}} style={{cursor: 'pointer'}}> <span className='badge badge-success'>active</span></div>}
        {params.row.is_active == '0' &&  <div onClick={()=>{statusUpdateCountrie(params.row.id)}} style={{cursor: 'pointer'}}> <span className='badge badge-danger'>Inactive</span></div>}
        
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
        {countriesEdit == true && <Button  sx={{ minWidth: 40 }}  component={Link} to={'/countries/edit/'+params.row.id} > <EditIcon  /> </Button>}
        {countriesDelete == true && <Button  sx={{ minWidth: 40 }}   onClick={()=>{deleteCountryById(params.row.id)}}> <DeleteIcon  /> </Button>}
        </>
      );
   }
  },
];
const statusUpdateCountrie=(e:any)=>{
  const formData= {
    country_id : e
  }
    store.dispatch(StatusCountry(formData)).then((res: any) => {
    if(res.payload.status==true){
      toast.success(res.payload.message);
      getCountrieData();
    }else{
         toast.error(res.payload.message);
    }
  }); 
}

const deleteCountryById=(e:any)=>{
const formData ={
  country_id :e
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
      store.dispatch(deleteCountry(formData)).then((res: any) => {
        if(res.payload.status==true){
          setCountries((prevRows : any) => {
            const rowToDeleteIndex = randomInt(0, prevRows.length - 1);
            return [
              ...countries.slice(0, rowToDeleteIndex),
              ...countries.slice(rowToDeleteIndex + 1),
            ];
          });
         toast.success(res.payload.message);
        //  setCountries([]);
        //  getCountrieData();
        }else{
             toast.error(res.payload.message);
        }
      }); 
    }
  })
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
                  Countries 
                  </Typography>
                  {countriesAdd == true && <Button variant="contained" component={Link} to="/countries/add">Add</Button>}
                </Box>
                <Divider />
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={countries}
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
//   return <CompanyList />;
// }