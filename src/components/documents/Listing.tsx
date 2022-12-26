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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";

const mdTheme = createTheme();
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12];

function DocumentList() {
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
                 </Box>
                <Divider />
                  <Container sx={{ py: 3  ,paddingTop:"18px"}}  >
                          {/* End hero unit */}
                          <Grid container spacing={2}  sx={{paddingTop:"0px" }} >
                            {cards.map((card) => (
                              <Grid item key={card}  xs={12} sm={6} md={4}  sx={{paddingTop:"0px" }} >
                                <Card  className='' sx={{ height: "100%" ,boxShadow:'none' ,border:"1px solid black"}} >
                                  <CardContent sx={{paddingTop:"6px", pb:'6px !important' }} >
                                     <Toolbar sx={{ pr:'0px !important' }}>
                                     <Checkbox className='documentselect' />
                                      <PermMediaIcon   sx={{ width: '20%' , height: '20%'}} />
                                      <Typography variant="h6" color="inherit"  sx={{pl:1 ,lineHeight:'19px'}} >
                                        Folder
                                         <Typography  sx={{color:"#808080d1", fontSize:'13px'}} >
                                        Uploaded 2022-02-02
                                      </Typography>
                                      </Typography>
                                      <ControlPointIcon sx={{ width: '15%' , height: '20%' ,color:'#000' ,ml:'20px'}} />
                                      </Toolbar>
                                  </CardContent>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                        </Container>
                  <Divider />
                  
                  <Toolbar  sx={{ ml: 0 ,pl:"0 !important"}}>
                    <Button variant="contained" component={Link} to="/documents/share"   >Share </Button>
                    <Button variant="contained" component={Link} to="/documents/share" sx={{ ml: 1 }} >Request </Button>
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
export default function Listing() {
  return <DocumentList />;
}