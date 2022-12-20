import {createTheme, styled, ThemeProvider } from '@mui/material/styles';
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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { createCompanyFolder, getCompanyFolder } from '../../redux/store/reducers/slices/UserSlice';
import { store } from '../../redux/store';

const mdTheme = createTheme();
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

function DocumentList() {
  const params = useParams();
    const [open, setOpen] = React.useState(false);
    const [openFolder, setFolder] = React.useState(false);
    const [folder, setCompanyFolder] = useState([]);
    const [title,setTitle] = useState('');
    const [file, setFile] = useState<File>();
    const [ showFolder, setShowFolder]= useState([])
    const [ addFolders, setAddFolders]= useState([])


    
    const handleAdd = (e:any) => {
      console.log(params.companyId,"params")
      e.preventDefault();
      const formData = {
        company_id:params.companyId,
        title:title,
      }
      console.log(formData,"formData")
      store.dispatch(createCompanyFolder(formData)).then((res: any) => {
        console.log(res,"jjjjjjjjjj")
        setCompanyFolder(res.response)
        // window.location.reload();
        // if (res.payload.status == true) {
        //   // setErrorMessages('');
        //   // navigate("/roles");
        // } else {
        //   // setErrorMessages(res.payload?.message);
        // }
      });           
    };
    const UploadDocument = (e:any) => {
      console.log(params.companyId,"params")
      alert(e.target.value)
      e.preventDefault();
      const formData = {
        company_id:params.companyId,
        user_id:e.target.value,
        profile_picture:file,
      }
      console.log(formData,"formData")
      // store.dispatch(createCompanyFolder(formData)).then((res: any) => {
      //   console.log(res,"jjjjjjjjjj")
      //   setCompanyFolder(res.response)
      //   // window.location.reload();
      //   // if (res.payload.status == true) {
      //   //   // setErrorMessages('');
      //   //   // navigate("/roles");
      //   // } else {
      //   //   // setErrorMessages(res.payload?.message);
      //   // }
      // });           
    };
    
    // const addFolder = (e:any)=>{
    //   console.log(!e.target.value)
    // }
    function addFolder(event:any) {
      console.log(event,"event");
      setAddFolders(event)
      // addFolders.forEach((id)=>{
        console.log(addFolders,"77777")
      // })
  }

    const handleFileChange = (e:any) => {
      if (e.target.files) {
        console.log(e.target.files[0],"file")
        setFile(e.target.files[0]);
      }
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleClickOpenFolder = () => {
      setFolder(true);
    };
    const handleCloseFolder = () => {
      setFolder(false);
    };
  

    const getCpmpanyFolder=()=>{
      const formData = {
        company_id:params.companyId,
      }
      store.dispatch(getCompanyFolder(formData)).then((res: any) => {
        console.log(res.payload.folders,"5555")
        setShowFolder(res.payload.folders);
        // if (res && res.payload?.permissionparent) {
        //   setCompanyFolder(res.payload);
        // } 
      }); 
    }
      useEffect(() => {
        getCpmpanyFolder();
    }, []);

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
                    Documents 
                    </Typography>
                    <Button variant="contained"  onClick={handleClickOpen} >Add</Button>
                </Box>
                <Divider />
                  <Container sx={{ py: 3  ,paddingTop:"18px"}}  >
                    {/* End hero unit */}
                    <Grid container spacing={2}  sx={{paddingTop:"0px" }} >
                      {showFolder.map((card:any) => (
                        <Grid item key={card}  xs={12} sm={6} md={4}  sx={{paddingTop:"0px" }} >
                          <Card  className='' sx={{ height: "100%" ,boxShadow:'none' ,border:"1px solid black"}} >
                            <CardContent sx={{paddingTop:"6px", pb:'6px !important' }} >
                                <Toolbar sx={{ pr:'0px !important' }}>
                                <Checkbox className='documentselect' onClick={()=>{addFolder(card)}}/>
                                <PermMediaIcon   sx={{ width: '20%' , height: '20%'}} />
                                <Typography variant="h6" color="inherit"  sx={{pl:1 ,lineHeight:'19px'}} >
                                <Typography component={Link} to="/companies/document/view/1">{card.title}</Typography>
                                  <Typography  sx={{color:"#808080d1", fontSize:'13px'}} >
                                  Uploaded 2022-02-02
                                </Typography>
                                </Typography>
                                <ControlPointIcon sx={{ width: '15%' , height: '20%' ,color:'#000' ,ml:'20px'}} onClick={handleClickOpenFolder} />
                                </Toolbar>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                  </Grid>
                  </Container>
                  <Divider />
                  <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
                    <Button variant="contained" component={Link} to="/companies/document/share"   >Share </Button>
                    <Button variant="contained" component={Link} to="/companies/document/share" sx={{ ml: 1 }} >Request </Button>
                    <Button variant="contained" component={Link} to="/companies" sx={{ ml: 1 }} >Cancel </Button>
                  </Toolbar>   
                </Paper>
              </Grid>
            </Grid>
           <Footer />
          </Container>
        </Box>
      </Box>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Documents
        <IconButton aria-label="close" onClick={handleClose} sx={{position: 'absolute',right: 8,top: 8,color: (theme) => theme.palette.grey[500],
          }}
        >
        <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TextField margin="normal" 
          required 
          fullWidth 
          id="title" 
          label="Title" 
          name="title"     
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}/> 
        </DialogContent>
        <DialogActions>
          <Button  variant="contained"  onClick={handleAdd}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {/* add image in folder  */}
      <BootstrapDialog onClose={handleCloseFolder} aria-labelledby="customized-dialog-title" open={openFolder} >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Upload Documents
        <IconButton aria-label="close" onClick={handleCloseFolder} sx={{position: 'absolute',right: 8,top: 8,color: (theme) => theme.palette.grey[500],
          }}
        >
        <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent dividers>
           <input type="file" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button  variant="contained"  onClick={UploadDocument}>
            Upload
          </Button> 
        </DialogActions>
      </BootstrapDialog>
    </ThemeProvider>
  );
}
export default function Listing() {
  return <DocumentList />;
}