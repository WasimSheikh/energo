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
import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import { createCompanyFolder, getCompanyFolder, uploadeImage ,getRolehasPermission} from '../../redux/store/reducers/slices/UserSlice';
import {  toast } from 'react-toastify';
import { store } from '../../redux/store';
import {useNavigate} from "react-router-dom"
import { json } from 'stream/consumers';
import '../common/common.css'
import DocumentView from './DocumentView'


const mdTheme = createTheme();
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

type data={
  documents:any
}


export default function DocumentList(props:data) {
  const navigate = useNavigate();
  const fileInput = useRef<any | null>(null);
  const params = useParams();
    const [open, setOpen] = React.useState(false);
    const [openFolder, setFolder] = React.useState(false);
    const [folder, setCompanyFolder] = useState([]);
    const [title,setTitle] = useState('');
    const [documents, setFile] = React.useState<any | null>(null);
    const [ showFolder, setShowFolder]= useState([])
    const [ addFolders, setAddFolders]= useState([])
    const [ folderId, setFolderId]= useState('')
    const [ disabled, setDisabled]= useState(false)

    
    var noData:any=[1]
    var newArray:any =[]
    var foldersData:any =[]
    const handleAdd = (e:any) => {
     
      e.preventDefault();
      const formData = {
        company_id:params.companyId,
        title:title,
      }
     
      store.dispatch(createCompanyFolder(formData)).then((res: any) => {
        setCompanyFolder(res.response)
        if (res.payload.status == true) {
          toast.success(res.payload.message);
          handleClose()
          getCpmpanyFolder();
            // navigate(`/companies/document/${params.companyId}`)
        } else {
          toast.error(res.payload.message)
        }
      });           
    };
    const getBase64 = (file:FileList|null) => {
      if(file){
        const fileRef =file[0] || ""
        const fileType :string = fileRef.type || ""
        
        const reader = new FileReader()
        reader.readAsBinaryString(fileRef)
        reader.onload = (ev:any)=>{
          setFile(`data:${fileType};base64,${btoa(ev.target.result)}`)
        }
      }
    };
    
    
    function UploadDocument(e:any){
      e.preventDefault();
      var imageUrl:any;
     var folderIds = JSON.stringify(folderId)
     var company_id = params.companyId
     var company_ids = JSON.stringify(company_id)
      const formData:any = {
        'company_id':company_id,
        'folder_id':folderId,
        'documents':documents,
      }
      store.dispatch(uploadeImage(formData)).then((res: any) => {
        setCompanyFolder(res.response)
        if (res.payload.status == true) {
          toast.success(res.message)
          navigate(`/companies/document/${params.companyId}`)
          handleCloseFolder()
        } else {
          toast.error(res.message)
        }
      });           
    };

    function addFolder(event:any,i:any,e:any) {
      var ID = event.id
      var cardID = (document.getElementById(i+'card')as any);
      if (!newArray.includes(ID)){
        newArray.push(event.id);
        foldersData.push(event);
          cardID.classList.add("Active");
      }else{
        newArray = newArray.filter((id:any) => id != ID);
        foldersData = foldersData.filter((id:any) => id.id != ID);
        cardID.classList.remove("Active");
      }
      
      // if(newArray.length > '0'){
      //   setDisabled(true)
      // }else{
      //   setDisabled(false)
      // }
      }

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    function handleClickOpenFolder(id:any){
      setFolderId(id)
      setFolder(true);
    };
    const handleCloseFolder = () => {
      setFolder(false);
      setFile(null);
    };
  

    const getCpmpanyFolder=()=>{
      const formData = {
        company_id:params.companyId,
      }
      store.dispatch(getCompanyFolder(formData)).then((res: any) => {
        setShowFolder(res.payload.folders);
      }); 
    }
    var role_id = localStorage.getItem('user_id')
function getRolehasPermissiondata(){
  store.dispatch(getRolehasPermission(role_id)).then((res:any)=>{
    
  })
}

      useEffect(() => {
        getCpmpanyFolder();
        getRolehasPermissiondata()

    }, []);

    function sendMessage(){
      props.documents(foldersData)
      navigate("/companies/document/share/"+params.companyId)
    }
    function viewDocument(id:any){
      navigate(`/companies/document/view/${id}/${params.companyId}`)
    }
  
    const noFolders = noData.map((card:any)=>{
      return(
        <div className="container mt-4">
          <div className="alert alert-primary" role="alert">
              No folders found please add folders!
          </div>
        </div>
    
      )
    })

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
                      {showFolder != null ? showFolder?.map((card:any, i:any) => (
                        <Grid item key={card.id}  xs={12} sm={6} md={4}  sx={{paddingTop:"0px" }} >
                          <Card  className='' sx={{ height: "100%" ,boxShadow:'none' ,border:"1px solid black"}}  id={i + 'card'}>
                            <CardContent sx={{paddingTop:"6px", pb:'6px !important' }} >
                                <Toolbar sx={{ pr:'0px !important' }}>
                                <Checkbox className='documentselect' onClick={(e)=>{addFolder(card,i,e.target);}} />
                                <PermMediaIcon   sx={{ width: '20%' , height: '20%'}} />
                                <Typography variant="h6" color="inherit"  sx={{pl:1 ,lineHeight:'19px'}} >
                                <Typography  onClick={()=>{viewDocument(card.id)}} style={{cursor: 'pointer'}}>{card.title}</Typography>
                                  <Typography  sx={{color:"#808080d1", fontSize:'13px'}} >
                                  Uploaded {new Date(card.created_at).toLocaleDateString()}
                                </Typography>
                                </Typography>
                                <ControlPointIcon sx={{ width: '15%' , height: '20%' ,color:'#000' ,ml:'20px'}} onClick={()=>{handleClickOpenFolder(card.id)}} style={{cursor: 'pointer'}}/>
                                </Toolbar>
                            </CardContent>
                          </Card>
                        </Grid>
                      )):noFolders}
                  </Grid>
                  </Container>
                  <Divider />
                  <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
                    <Button variant="contained"  onClick={()=>{sendMessage()}} >Share </Button>
                    {/* <Button variant="contained" component={Link} to="/companies/document/share" sx={{ ml: 1 }} disabled={disabled == false}>Request </Button> */}
                    <Button variant="contained" component={Link} to="/companies" sx={{ ml: 1 }} >Cancel </Button>
                  </Toolbar>   
                </Paper>
              </Grid>
            </Grid>
           <Footer />
          </Container>
        </Box>
      </Box>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}  id="addFolder">
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
      <div className="card px-4">
      <form onSubmit={UploadDocument} className="form-group mt-2" encType="multipart/form-data" >
      <label>
        Upload file:
        </label> 
        <input type="file" ref={fileInput} onChange={(e)=>{getBase64(e.target.files)}} className="form-control" multiple/>
        {documents && <img src={documents} alt="img"  style={{height: '150px', width: '100%'}} className="mt-2 mb-2"/>}
     
      <br />
      <div className="text-center">
      <button type="submit" className='btn btn-primary'>Submit</button>
      </div>
     
    </form>
      </div>
      </BootstrapDialog>
    </ThemeProvider>
  );
}
// export default function Listing(props:data) {
//   return <DocumentList />;
// }