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
import { deleteCompany,getCompanies, getRolehasPermissions, statusCompany, } from '../../redux/store/reducers/slices/UserSlice';
import React, { useEffect , useState } from 'react';
import { store } from '../../redux/store';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { randomInt, randomUserName } from '@mui/x-data-grid-generator';
import capitalizeFirstLetter from '../utils/FormUtils';
import { useSelector } from 'react-redux';



function CompanyList() {
  const currentUser: any = useSelector((state: any) => state.user.currUser);
  const [companiesss,setCompanies] = useState([]);
  const [companyAdd,setCompanyAdd] = useState(false);
  const [companyEdit,setCompanyEdit] = useState(false);
  const [companyDelete,setCompanyDelete] = useState(false);
  const [companyView,setCompanyView] = useState(false);
  
const getCompanyData =()=>{
  store.dispatch(getCompanies()).then((res: any) => {
    if (res.payload.status == true) {
      setCompanies(res.payload.companies);
    }else{
      toast.error(res.payload.message)
    }
  }); 
}

function addPermission(){
  // var role_id:any = localStorage.getItem('role_id')
  // const formData={
  //   role_id:role_id
  // }
  //store.dispatch(getRolehasPermissions(formData)).then((res: any) => {
    var allPermission:any = currentUser.permission;
    if(allPermission.length != 0){
      allPermission.forEach((per:any) => {
        if(capitalizeFirstLetter(per.flag) == "Companies"){
          if(per.name == "Add"){
            setCompanyAdd(true)
          }else if(per.name == "Edit"){
            setCompanyEdit(true)
          }else if(per.name == "Delete"){
            setCompanyDelete(true)
          }else if(per.name == "View"){
            setCompanyView(true)
          }
        }
      });
    }
  //}); 
}

  useEffect(() => {
    getCompanyData();
    addPermission();
  },[]);

const mdTheme = createTheme();

const columns: GridColDef[] = [
  { field: 'id',
   headerName: 'S.No.',
    width: 40,
    renderCell: (index:any) => index.api.getRowIndex(index.row.id) + 1,
  },
  {
    field: 'title',
    headerName: 'Company Name',
    width: 140,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 220,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 110,
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
    width: 100,
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
    width: 220,
    sortable: false,
    renderCell: (params) => {
      return (
        <>
       {companyEdit == true && <Button  sx={{ minWithd: 40 }}   component={Link} to={'/companies/edit/'+params.row.id} > <EditIcon  /> </Button>}
        {companyView ==true && <Button  sx={{ minWidth: 40 }}  component={Link} to={'/companies/view/'+params.row.id} > <VisibilityIcon  /> </Button>}
        {companyDelete ==true && <Button onClick={()=>{deleteId(params.row.id)}}  sx={{ minWidth: 40 }}   > <DeleteIcon  /> </Button>}
        <Button  sx={{ minWidth: 40 }}  component={Link} to={'/companies/document/'+params.row.id} > <FileCopyIcon  /> </Button>
        
        </>
      );
   }
  },
];


const statusUpdateCompany=(e:any)=>{
  const formData= {
    id : e
  }
    store.dispatch(statusCompany(formData)).then((res: any) => {
    if(res.payload.status==true){
     toast.success(res.payload.message);
      getCompanyData();
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
      store.dispatch(deleteCompany(e)).then((res: any) => {
        if(res.payload.status==true){
              setCompanies((prevRows : any) => {
                const rowToDeleteIndex = randomInt(0, prevRows.length - 1);
                return [
                  ...companiesss.slice(0, rowToDeleteIndex),
                  ...companiesss.slice(rowToDeleteIndex + 1),
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
                    Companies 
                    </Typography>
                    {companyAdd == true && <Button variant="contained" component={Link} to="/companies/add">Add</Button>}
                </Box>
                <Divider />
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={companiesss}
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
