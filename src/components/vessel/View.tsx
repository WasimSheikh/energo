import {
  createTheme,
  Theme,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Navigation from "../common/Navigation";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Divider from "@mui/material/Divider";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import {
  deleteCategory,
  deleteVesselAudit,
  getAuditVessels,
  getCategory,
  getCompany,
  getDocuments,
  getVessel,
  statusAuditVessel,
  statusCategory,
} from "../../redux/store/reducers/slices/UserSlice";
import { store } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DatePicker from 'react-datepicker';
import Swal from "sweetalert2";
import axios from "axios";
function CompanyView() {
  const mdTheme = createTheme();
  const [id, setId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = React.useState(false);
  const [logo, setLogo] = useState("");
  const [state, setState] = useState("");
  const [cities, setCities] = useState([]);
  const [category, setCategory] = useState("");
  const [src, setSrc] = useState("");
  const [companies,setCompanies] = useState([]);
  const [showImages, setShowImages] = useState([]);
  const [onload, setOnload] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date:any) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (onload == false) {
      const companyId = window.location.href.split("/")[5];
      const formData = { id: companyId };
      store.dispatch(getVessel(formData)).then((res: any) => {
        setOnload(true);
        if (res && res.payload) {
         
          setTitle(res.payload.vessel.title);

          setCompanyName(res.payload.vessel.company.title);
          setId(res.payload.vessel.id);
          setCompanyName(res.payload.company.title);

          setShowImages(res?.payload?.vessel?.media_url?.picture);
        }
      });
    }
  });
  
  const [dirtyFields, setDirtyFields] = useState({
    state: false,
    company_id: false,
  });
  const isValidData = (): boolean => {
    const validateFields = ifEmpty(state);
    return validateFields;
  };
  const ifEmpty = (val: string): boolean => {
    return val != undefined && val != "" && val.length > 0; // return true;
  };

  const getError = (msg: string): JSX.Element => {
    return (
      <span className="text-13 d-inline-block ml-1 text_13 text-danger">
        {msg}
      </span>
    );
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function formatDate(dateString:any) {
    const date = new Date(dateString);
    // const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    return formattedDate;
  }
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
  const statusUpdateCompany = (e: any) => {
    const formData = {
      id: e,
    };
    store.dispatch(statusAuditVessel(formData)).then((res: any) => {
      if (res.payload.status == true) {
        toast.success(res.payload.message);
        getVesselData();
      } else {
        toast.error(res.payload.message);
      }
    });
  };

  const getVesselData =()=>{
    store.dispatch(getAuditVessels()).then((res: any) => {
      if (res.payload.status == true) {
        setCompanies(res.payload.vessels_audit);
      }else{
        toast.error(res.payload.message)
      }
    }); 
  }
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
        store.dispatch(deleteVesselAudit(formdata)).then((res: any) => {
          if (res.payload.status == true) {
            getCategoryList();
            getVesselData()
            toast.success(res.payload.message);
          } else {
            toast.error(res.payload.message);
          }
        });
      }
    });
  };
  const dateString = selectedDate;
  const formattedDate = formatDate(dateString);
  var token = localStorage.getItem("access_token");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    };
    const formData = new FormData();
    formData.append("title", state);
    formData.append("category_id",  category);
    formData.append("vessel_id", id);
    formData.append("audit_date", formattedDate);
    formData.append("picture", src);
    formData.append("owner_user_id", '4');
    const imageFile = document.getElementById(
      "imageId"
    ) as HTMLInputElement | null;
    if (imageFile?.files?.[0]) {
      formData.append("image", imageFile.files[0]);
    }

    axios
      .post(
        "https://laravel.cppatidar.com/energo/backend/api/createVesselAudit",
        formData,
        { headers }
      )
      .then((res: any) => {
        if (res.data.status == true) {
          toast.success(res.data.message);
          handleClose()
          getVesselData()
        } else {
          toast.error(res.data.message);
        }
      });
  };
  useEffect(() =>{
    getCategoryList()
    getVesselData()
  }, [])
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
      headerName: 'Vessel Name',
      width: 240,
    },
    {
      field: 'category_title',
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
           {params.row.is_active == '1' && <button type="button" className="btn btn-link"  
           onClick={()=>{statusUpdateCompany(params.row.id)}}
            ><span className='badge badge-success'>Active</span></button>}
            {params.row.is_active == '0' &&  <button type="button" className="btn btn-link" 
            onClick={()=>{statusUpdateCompany(params.row.id)}} 
            ><span className='badge badge-danger'>Inactive</span></button>}
          
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
            <Button sx={{ minWidth: 40 }} component={Link} to={'/vesselaudit/edit/' + params.row.id}>
              <EditIcon />
            </Button>
            <Button sx={{ minWidth: 40 }} component={Link} to={'/vesselaudit/view/' + params.row.id}>
              <VisibilityIcon />
            </Button>
            <Button 
            onClick={() => { deleteId(params.row.id) }}
             sx={{ minWidth: 40 }}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];  
  const theme = useTheme();
  const fileInput = useRef<any | null>(null);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <Navigation />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    View Vessel
                  </Typography>
                  <Divider />
                  <Box sx={{ mt: 1 }}>
                    <Grid container spacing={2} rowSpacing={1} sx={{ mb: 2 }}>
                      <Grid item xs={6} sm={6}>
                        <Box>
                          {" "}
                          Title :<Box component="span">{title}</Box>
                        </Box>

                        <Box sx={{ mb: 2, mt: 2 }}>
                          Company Name :{" "}
                          <Box component="span">{companyName}</Box>
                        </Box>

                        <Box>
                          Company logo : <Box component="span">
                            {showImages}</Box>
                        </Box>
                      </Grid>
                    </Grid>

                    <Divider />
                    <Toolbar sx={{ ml: 0, pl: "0 !important" }}>
                      <Button
                        variant="contained"
                        component={Link}
                        to="/vessel"
                        sx={{ ml: 1 }}
                      >
                        Cancel{" "}
                      </Button>
                    </Toolbar>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{mt:4}}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Box className="headingbutton" sx={{ mb: 1 }}>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Vessel Audits
                    </Typography>
                    <Button variant="contained"
                    onClick={handleOpen}
                     >
            Add{" "}
            </Button>
                </Box>
                <Divider />
                <Box sx={{ height: 300, width: '100%' }}>
                  <DataGrid
                    rows={companies}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </Box>
                </Paper>
              </Grid>
            <Footer />
          </Container>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Audits and inspection</DialogTitle>
        <Grid item xs={6} sm={6} sx={{ px: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="country"
            label="Title"
            name="country"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setDirtyFields((dirty) => ({
                ...dirty,
                state: !ifEmpty(e.target.value),
              }));
            }}
          />
          {dirtyFields["state"] && getError("Title is required ")}
        </Grid>
        <Grid item xs={6} sm={6} mt={1} sx={{ px: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="company_name_label">Category Name</InputLabel>
            <Select
              labelId="company_name_label"
              required
              id="company_name"
              value={category}
              label="Company Name"
              // onChange={selectChange}
              onChange={(e) => {
                setCategory(e.target.value);
                setDirtyFields((dirty) => ({
                  ...dirty,
                  company_id: !ifEmpty(e.target.value),
                }));
              }}
            >
              <MenuItem value="">-Select-</MenuItem>
              {cities.map((opt: any) => (
                <MenuItem key={opt.id} value={opt.id}>
                  {opt.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} mt={1} sx={{ px: 3 }}>
          
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Select a date"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params:any) => <TextField {...params} />}
      />
    </LocalizationProvider> */}
        </Grid>
        <Grid item xs={6} sm={6} mt={1}  sx={{ px: 3 }}>
        <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
     placeholderText="Select a Audit date"
    />
    
        </Grid>
        <Grid item xs={6} sm={6}  mt={1}  sx={{ px: 3 }}>
                        <input
                          type="file"
                          ref={fileInput}
                          onChange={(e: any) => {
                            setSrc(e.target.files[0]);
                          }}
                          className="form-control"
                        />
                      </Grid>
                      
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
           onClick={handleSubmit}
             color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
export default function Add() {
  return <CompanyView />;
}
