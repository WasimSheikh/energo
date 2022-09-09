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


const mdTheme = createTheme();
function DashboardContent() {
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
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Recent Deposits
                  </Typography>
                  <Typography component="p" variant="h4">
                    $3,024.00
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    on 15 March, 2019
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Recent Deposits
                  </Typography>
                  <Typography component="p" variant="h4">
                    $3,024.00
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    on 15 March, 2019
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Recent Deposits
                  </Typography>
                  <Typography component="p" variant="h4">
                    $3,024.00
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    on 15 March, 2019
                  </Typography>
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

export default function Dashboard() {
  return <DashboardContent />;
}