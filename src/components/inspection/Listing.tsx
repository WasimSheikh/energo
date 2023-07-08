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
import { Link ,useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCompany,deleteVessel,getCompanies, getCompaniesAudit, getRolehasPermissions, getVessels, statusCompany, statusVessel, } from '../../redux/store/reducers/slices/UserSlice';
import React, { useEffect , useState } from 'react';
import { store } from '../../redux/store';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { randomInt, randomUserName } from '@mui/x-data-grid-generator';
import capitalizeFirstLetter from '../utils/FormUtils';
import { useSelector } from 'react-redux';



function VesselList() {
  const currentUser: any = useSelector((state: any) => state.user.currUser);
  const [companies,setCompanies] = useState([]);
  const [companyAdd,setCompanyAdd] = useState(false);
  const [companyEdit,setCompanyEdit] = useState(false);
  const [companyDelete,setCompanyDelete] = useState(false);
  const [companyView,setCompanyView] = useState(false);
  var permission:any =localStorage.getItem('permissions');
const getVesselData =()=>{
  store.dispatch(getCompaniesAudit()).then((res: any) => {
    if (res.payload.status == true) {
      setCompanies(res.payload.companies_audit);
    }else{
      toast.error(res.payload.message)
    }
  }); 
}
// function addPermission(){
//   // var role_id:any = localStorage.getItem('role_id')
//   // const formData={
//   //   role_id:role_id
//   // }
//   // store.dispatch(getRolehasPermissions(formData)).then((res: any) => {
//   //   var allPermission:any = res.payload?.data;
  
//     var allPermission:any =  JSON.parse(permission);

//     // if(allPermission.length != 0){
//     //   allPermission.forEach((per:any) => {
//     //     if(capitalizeFirstLetter(per.flag) == "Companies"){
//     //       if(per.name == "Add"){
//     //         setCompanyAdd(true)
//     //       }else if(per.name == "Edit"){
//     //         setCompanyEdit(true)
//     //       }else if(per.name == "Delete"){
//     //         setCompanyDelete(true)
//     //       }else if(per.name == "View"){
//     //         setCompanyView(true)
//     //       }
//     //     }
//     //   });
//     // }
//   // }); 
// }

  useEffect(() => {
    getVesselData();
    // addPermission();
  },[]);

const mdTheme = createTheme();

const columns: GridColDef[] = [
  { field: 'id',
   headerName: 'S.No.',
    width: 100,
    renderCell: (index:any) => index.api.getRowIndex(index.row.id) + 1,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 180,
  },

  {
    field: 'company_title',
    headerName: 'Company Name',
    width: 240,
  },
  {
    field: 'compan',
    headerName: 'Category',
    width: 240,
  },
 
   {
    field: 'is_active',
    headerName: 'Status',
    width: 130,
    sortable: false,
    renderCell: (params) => {
      return (
        <>
         {params.row.is_active == '1' && <button type="button" className="btn btn-link"  onClick={()=>{statusUpdateCompany(params.row.id)}} ><span className='badge badge-success'>Active</span></button>}
          {params.row.is_active == '0' &&  <button type="button" className="btn btn-link"  onClick={()=>{statusUpdateCompany(params.row.id)}} ><span className='badge badge-danger'>Inactive</span></button>}
        
        </>
      );
   }
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 180,
    sortable: false,
    flex: 1,
    renderCell: (params) => {
      return (
        <>
          <Button sx={{ minWidth: 40 }} component={Link} to={'/inspection/edit/' + params.row.id}>
            <EditIcon />
          </Button>
          <Button sx={{ minWidth: 40 }} component={Link} to={'/inspection/edit/' + params.row.id}>
            <VisibilityIcon />
          </Button>
          <Button onClick={() => { deleteId(params.row.id) }} sx={{ minWidth: 40 }}>
            <DeleteIcon />
          </Button>
        </>
      );
    },
  },
];


const statusUpdateCompany=(e:any)=>{
  const formData= {
    id : e
  }
    store.dispatch(statusVessel(formData)).then((res: any) => {
    if(res.payload.status==true){
     toast.success(res.payload.message);
     getVesselData();
    }else{
         toast.error(res.payload.message);
    }
  }); 
}

const deleteId=(e:any)=>{

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
      store.dispatch(deleteVessel(e)).then((res: any) => {
        if(res.payload.status==true){
              setCompanies((prevRows : any) => {
                const rowToDeleteIndex = randomInt(0, prevRows.length - 1);
                return [
                  ...companies.slice(0, rowToDeleteIndex),
                  ...companies.slice(rowToDeleteIndex + 1),
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
                    Inspection
                    </Typography>
               <Button variant="contained" component={Link} to="/vessel/add">Add</Button>
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
  return <VesselList />;
}
