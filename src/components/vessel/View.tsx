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
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getCompany,
  getDocuments,
  getVessel,
} from "../../redux/store/reducers/slices/UserSlice";
import { store } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CompanyView() {
  const mdTheme = createTheme();
  const [id, setId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [logo, setLogo] = useState("");
  const [showImages, setShowImages] = useState([]);
  const [onload, setOnload] = useState(false);

  useEffect(() => {
    if (onload == false) {
      const companyId = window.location.href.split("/")[5];
      const formData = { id: companyId };
      store.dispatch(getVessel(formData)).then((res: any) => {
        setOnload(true);
        if (res && res.payload) {
          console.log(res?.payload?.vessel?.media_url, "res");
          setTitle(res.payload.vessel.title);

          setCompanyName(res.payload.vessel.company.title);
          setId(res.payload.id);
          setCompanyName(res.payload.company.title);

          setShowImages(res?.payload?.vessel?.media_url);
        }
      });
    }
  });
  console.log(logo, "logo");
  const theme = useTheme();

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
                    View Company
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
                          Company logo : <Box component="span">{logo}</Box>
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
            <Footer />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default function Add() {
  return <CompanyView />;
}
