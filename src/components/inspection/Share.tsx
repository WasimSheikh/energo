import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Navigation from '../common/Navigation';
import Divider from '@mui/material/Divider';
import Footer from '../common/Footer';
import Header from '../common/Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { Link, useNavigate, useParams } from "react-router-dom";
import { store } from '../../redux/store';
import { shareDocuments } from '../../redux/store/reducers/slices/UserSlice';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { resolve } from 'path';

const mdTheme = createTheme();
type shareData={
  shareData:any;
}


export default function Share(props:shareData): JSX.Element {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [documents, setDocuments] = useState(props.shareData);
  const [folder, setfolders] = useState("");
const [src, setSrc] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const params = useParams();
  const fileInput = useRef<any | null>(null);
  const navigate = useNavigate();
var foldersArray:any =[]
  const handleSubmit = (e:any) => {
    documents.forEach((element:any) => {
      foldersArray.push(element.id)
    });
    var companyId = documents[0].company_id
   
    e.preventDefault();
    const formData = {
      name: name,
      email: email,
      description: description,
      folder_ids: foldersArray,
      company_id:params.companyId
    }
    store.dispatch(shareDocuments(formData)).then((res: any) => {
     
      if (res.payload.status == true) {
        setErrorMessages('');
        toast.success(res.payload?.message)
        
      } else {
        toast.error(res.payload?.message)
        setErrorMessages(res.payload?.message);
      }
    });
  };
useEffect(() => {
  if(props.shareData.length == 0){
    // toast.error('Please select folder first')
    navigate("/companies/document/"+params.companyId)
  }
},[]);

function cancel(){
  navigate(`/companies/document/${documents[0].company_id}`)
}

const folderList = documents?.map((card:any)=>{
  return(
    <Grid item key={card.id} xs={12} sm={6} md={12} sx={{ paddingTop: "0px" }} >
    <Card sx={{ height: "100%", boxShadow: 'none', border: "1px solid black" }} >
      <CardContent sx={{ paddingTop: "6px", pb: '6px !important' }} >
        <Toolbar>
          <PermMediaIcon sx={{ width: '20%', height: '20%' }} />
          <Typography variant="h6" color="inherit" sx={{ pl: 1, lineHeight: '19px' }} >
            {card.title}
            <Typography sx={{ color: "#808080d1", fontSize: '13px' }} >
            Uploaded {new Date(card.created_at).toLocaleDateString()}
            </Typography>
          </Typography>
        </Toolbar>
      </CardContent>
    </Card>
  </Grid>
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
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Documents / Share Files
                  </Typography>
                  <Divider />
                  <Box component="form" noValidate  sx={{ mt: 1 }}>
                    <Grid container spacing={2} rowSpacing={1} >
                      <Grid item xs={5} >
                        <Container sx={{ py: 3, paddingTop: "18px" }}  >
                          <Grid container spacing={2} sx={{ paddingTop: "0px" }} >
                          <Grid item xs={6} sm={6}>
                        <input
                          type="file"
                          ref={fileInput}
                          onChange={(e: any) => {
                            setSrc(e.target.files[0]);
                          }}
                          className="form-control"
                        />
                      </Grid>
                          </Grid>
                        </Container>
                      </Grid>
                      <Grid item xs={7} sx={{ mb: '20px !important' }} >
                        <TextField
                          margin="normal"
                          id="Name"
                          required
                          name="name"
                          autoFocus
                          label="Name"
                          fullWidth
                          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email"
                          name="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          multiline
                          rows={4}
                          id="description"
                          label="Reason for sharing/Requesting"
                          name="description"
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                  <Toolbar sx={{ ml: 0, pl: "0 !important" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                    <Button variant="contained"  onClick={cancel} sx={{ ml: 1 }} >Cancel </Button>
                  </Toolbar>


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
// export default function Add() {
//   return <ShareAdd />;
// }
