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
import { createCompanyFolder, getCompanyFolder, uploadeImage } from '../../redux/store/reducers/slices/UserSlice';
import {  toast } from 'react-toastify';
import { store } from '../../redux/store';
import {useNavigate} from "react-router-dom"
import { json } from 'stream/consumers';
import '../common/common.css'
import DocumentView from './DocumentView'
import { subject } from '../../app/_services/message.service';


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
    const [image,setImage]=useState()

  const sendMessage =()=> {
      navigate("/companies/document/share")
  }

    var documentss:any = documents;
    const handleAdd = (e:any) => {
      console.log(params.companyId,"params")
      e.preventDefault();
      const formData = {
        company_id:params.companyId,
        title:title,
      }
      console.log(formData,"formData")
      store.dispatch(createCompanyFolder(formData)).then((res: any) => {
        console.log(res,"jjjj")
        // toast.success(res.payload.message);
        setCompanyFolder(res.response)
        if (res.payload.status == true) {
          toast.success(res.payload.message);
          // setTimeout(() => {
            console.log((`/companies/document/${params.companyId}`),"000000000000000000")
            navigate(`/companies/document/${params.companyId}`)
          // }, 2000);
        } else {
          toast.error(res.payload.message)
        }
      });           
    };
    const getBase64 = (file:FileList|null) => {
      if(file){
        const fileRef =file[0] || ""
        const fileType :string = fileRef.type || ""
        console.log(fileType,"file upload type",fileRef)
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

         //  var documentone = JSON.stringify(imageUrl)
      // console.log(fileInput.current);
      // if (!fileInput) return;
      // alert(`Selected file - ${fileInput.current.files[0].name}`);
      // var documents1 = fileInput.current.files[0]
  //     var reader = new FileReader();
  //  reader.readAsDataURL(documents1);
  //  console.log(reader.result,"reader")
  //  reader.onload = function () {
  //    console.log(reader.result);
  //       imageUrl = reader.result
  //  };

      // const formData = new FormData();
      // formData.append("company_id",company_ids);
      // formData.append("folder_id",folderId);
      // formData.append("documents",documents1);

      const formData:any = {
        'company_id':company_id,
        'folder_id':folderId,
        'documents':documents,
      }
      store.dispatch(uploadeImage(formData)).then((res: any) => {
        setCompanyFolder(res.response)
        if (res.payload.status == true) {
          toast.success(res.message)
        } else {
          toast.error(res.message)
        }
      });           
    };

  //   var arrayNew:any =[];
  //  const handleChange = (value:any) => { 
  //    if (!arrayNew.includes(value)){
  //      console.log(arrayNew.includes(value),"ppppp")
  //      if((document.getElementById(value+'child')as any).checked == true){
  //        arrayNew.push(value);
  //      }
  //    }else{
  //      arrayNew = arrayNew.filter((res:any)=>{
  //        return res != value
  //      })
  //    }
  //  }; 


    
    var newArray:any =[]
    var finalArray:any=[]
      var filderIds:any = []

    function addFolder(event:any,i:any,e:any) {
      newArray.push(event.id)
      var cardID = (document.getElementById(i+'card')as any);
      var ID = event.id
      if(e.checked == true){
        var data = (document.getElementById(i+'card')as any);
        data.classList.add("Active");
        filderIds.push(event.id)
      }else{
        cardID.classList.remove("Active");
        finalArray = filderIds.filter((id:any) => id != ID);
        setAddFolders(finalArray);

      }
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
    };
  

    const getCpmpanyFolder=()=>{
      const formData = {
        company_id:params.companyId,
      }
      store.dispatch(getCompanyFolder(formData)).then((res: any) => {
        setShowFolder(res.payload.folders);
      }); 
    }

      useEffect(() => {
        console.log('555585858')
        getCpmpanyFolder();
    }, []);

    function sendFolder(){
      const formData = {
        company_id:params.companyId,
        id:finalArray,
      }
      console.log(formData)
      navigate("/companies/document/share")
    }
    function viewDocument(id:any){
      subject.next(params.companyId)
      navigate(`/companies/document/view/${id}`)
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
                    Documents 
                    </Typography>
                    <Button variant="contained"  onClick={handleClickOpen} >Add</Button>
                </Box>
                <Divider />
                  <Container sx={{ py: 3  ,paddingTop:"18px"}}  >
                    {/* End hero unit */}
                    <Grid container spacing={2}  sx={{paddingTop:"0px" }} >
                      {showFolder?.map((card:any, i:any) => (
                        <Grid item key={card.id}  xs={12} sm={6} md={4}  sx={{paddingTop:"0px" }} >
                          <Card  className='' sx={{ height: "100%" ,boxShadow:'none' ,border:"1px solid black"}}  id={i + 'card'}>
                            <CardContent sx={{paddingTop:"6px", pb:'6px !important' }} >
                                <Toolbar sx={{ pr:'0px !important' }}>
                                <Checkbox className='documentselect' onClick={(e)=>{addFolder(card,i,e.target);}} />
                                <PermMediaIcon   sx={{ width: '20%' , height: '20%'}} />
                                <Typography variant="h6" color="inherit"  sx={{pl:1 ,lineHeight:'19px'}} >
                                <Typography  onClick={()=>{viewDocument(card.id)}} style={{cursor: 'pointer'}}>{card.title}</Typography>
                                  <Typography  sx={{color:"#808080d1", fontSize:'13px'}} >
                                  Uploaded 2022-02-02
                                </Typography>
                                </Typography>
                                <ControlPointIcon sx={{ width: '15%' , height: '20%' ,color:'#000' ,ml:'20px'}} onClick={()=>{handleClickOpenFolder(card.id)}} style={{cursor: 'pointer'}}/>
                                </Toolbar>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                  </Grid>
                  </Container>
                  <Divider />
                  <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
                    <Button variant="contained"  onClick={()=>{sendMessage()}} >Share </Button>
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
        {/* <form  onSubmit={UploadDocument} >
        <DialogContent dividers>
           <input type="file" ref={fileInput}/>
        </DialogContent>
        <DialogActions>
          <Button  variant="contained"  type='submit' >
            Upload
          </Button> 
        </DialogActions>
        </form> */}
      <div className="card px-4">
      <form onSubmit={UploadDocument} className="form-group mt-2" encType="multipart/form-data" >
      <label>
        Upload file:
        </label> 
        <input type="file" ref={fileInput} onChange={(e)=>{getBase64(e.target.files)}} className="form-control" multiple/>
     
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
export default function Listing() {
  return <DocumentList />;
}