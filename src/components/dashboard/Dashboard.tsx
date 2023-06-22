import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import Header from '../common/Header';
import { getCompanies, getRolehasPermissions } from '../../redux/store/reducers/slices/UserSlice';
import { store } from '../../app/store';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
const mdTheme = createTheme();

function DashboardContent() {

  const [onload,setOnload] = useState(false);
  const [companiesss,setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('permissions');
    if(onload==false){
      setOnload(true);
      var role_id:any = localStorage.getItem('role_id')
      const roles = {
        role_id:role_id,
      } 
      store.dispatch(getRolehasPermissions(roles)).then((res: any) => {
        localStorage.setItem("permissions", JSON.stringify(res.payload.data));
      
      }); 
    }
  },[]);
  const params = useParams();
  const getCompanyData =()=>{
    store.dispatch(getCompanies()).then((res: any) => {
      if (res.payload.status == true) {
        setCompanies(res.payload.companies);
      }else{
        toast.error(res.payload.message)
      }
    }); 
  }
  useEffect(() => {
    getCompanyData();
},[]);


const deleteId=(id:any)=>{
  navigate(`/companies/view/${id}`)
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
         
          
            <Grid container spacing={2}>
              {companiesss.map((items:any) =>{
                return  <Grid item xs={12} md={3} lg={3} key={items.id}  onClick={()=>{deleteId(items.id)}}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                  }}
                >
                 <img src={items.logopath} className="img-deshboard" alt="img-text"/>
                  
                </Paper>
              </Grid>
              })}
             
            
            </Grid>
          
           <Footer />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}