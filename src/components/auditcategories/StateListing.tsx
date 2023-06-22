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
import { deleteCategory, deleteCity, deleteState, getCategory, getRolehasPermissions, getStates,statusCategory,statusCity, statusState } from '../../redux/store/reducers/slices/UserSlice';
import React, { useEffect , useState } from 'react';
import { store } from '../../redux/store';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { randomInt, randomUserName } from '@mui/x-data-grid-generator';
import { useSelector } from 'react-redux';
import VisibilityIcon from "@mui/icons-material/Visibility";


export default function StatesList() {
  const currentUser: any = useSelector((state: any) => state.user.currUser);
  const [cities,setCities] = useState([]);
  const [statesAdd,setStatesAdd] = useState(false);
  const [statesEdit,setStatesEdit] = useState(false);
  const [statesDelete,setStatesDelete] = useState(false);
  var permission:any =localStorage.getItem('permissions');

  function getCategoryList() {
    store.dispatch(getCategory()).then((res: any) => {
      console.log(res);
      if (res.payload.status == true) {
        setCities(res.payload?.vessels_audit);
      } else {
        toast.error(res.payload.message);
      }
    });
  }

function addPermission(){
  // var role_id:any = localStorage.getItem('role_id')
  // const formData={
  //   role_id:role_id
  // }
  // store.dispatch(getRolehasPermissions(formData)).then((res: any) => {
    var allPermission:any =  JSON.parse(permission);
      if(allPermission.length != 0){
      allPermission.forEach((per:any) => {
        if(per.flag == "States"){
          if(per.name == "Add"){
            setStatesAdd(true)
          }else if(per.name == "Edit"){
            setStatesEdit(true)
          }else if(per.name == "Delete"){
            setStatesDelete(true)
          }
        }
      });
    }
 // }); 
 
}

  useEffect(() => {
    getCategoryList();
    addPermission();
  },[]);

  const mdTheme = createTheme();
 
  
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

      const statusUpdateCompany = (e: any) => {
        const formData = {
          id: e,
        };
        store.dispatch(statusCategory(formData)).then((res: any) => {
          if (res.payload.status == true) {
            toast.success(res.payload.message);
            getCategoryList();
          } else {
            toast.error(res.payload.message);
          }
        });
      };
      const deleteId = (e: any) => {
        Swal.fire({
          title: "Are you sure want to delete?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes , confirm !",
        }).then((result: any) => {
          if (result.isConfirmed) {
            const formdata = {
              id: e,
            };
            store.dispatch(deleteCategory(formdata)).then((res: any) => {
              if (res.payload.status == true) {
                getCategoryList();
                toast.success(res.payload.message);
              } else {
                toast.error(res.payload.message);
              }
            });
          }
        });
      };
    const columns: GridColDef[] = [
    {
      field: "S.No",
      headerName: "S.No.",
      width: 100,
      renderCell: (index: any) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      renderCell: (params: any) => {},
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 250,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {params.row.is_active == "1" && (
              <button
                type="button"
                className="btn btn-link"
                onClick={() => {
                  statusUpdateCompany(params.row.id);
                }}
              >
                <span className="badge badge-success">Active</span>
              </button>
            )}
            {params.row.is_active == "0" && (
              <button
                type="button"
                className="btn btn-link"
                onClick={() => {
                  statusUpdateCompany(params.row.id);
                }}
              >
                <span className="badge badge-danger">Inactive</span>
              </button>
            )}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              sx={{ minWidth: 40 }}
              component={Link}
              to={"/auditcategories/edit/" + params.row.id}
            >
              {" "}
              <EditIcon />{" "}
            </Button>
            <Button
              sx={{ minWidth: 40 }}
              component={Link}
              to={"/auditcategories/view/" + params.row.id}
            >
              {" "}
              <VisibilityIcon />{" "}
            </Button>
            <Button
              sx={{ minWidth: 40 }}
              onClick={() => {
                deleteId(params.row.id);
              }}
            >
              {" "}
              <DeleteIcon />{" "}
            </Button>
          </>
        );
      },
    },
  ];
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
                <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    AuditCategories
                  </Typography>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/auditcategories/add"
                  >
                    Add
                  </Button>
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