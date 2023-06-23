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
  getinspectionAudit,
  getVessel,
  getvesselAudit,
} from "../../redux/store/reducers/slices/UserSlice";
import { store } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CompanyView() {
  const mdTheme = createTheme();
  const [id, setId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [logo, setLogo] = useState("");
  const [showImages, setShowImages] = useState([]);
  const [onload, setOnload] = useState(false);
 
  const [date, setDate] = useState("");
  const companyId = window.location.href.split("/")[5];
  useEffect(() => {
    if (onload == false) {
      const companyId = window.location.href.split("/")[5];
      const formData = { id: companyId };
      store.dispatch(getvesselAudit(formData)).then((res: any) => {
        console.log(res, 'res');
        setOnload(true);
        if (res && res.payload) {
         
          setTitle(res?.payload?.vessel_audit.title);

          setCompanyName(res?.payload?.vessel_audit.vessel_title);
          setId(res.payload.id);
          setCategory(res?.payload?.vessel_audit.category_title);

          setShowImages(res?.payload?.vessel_audit.picture);
          setDate(res?.payload?.vessel_audit.audit_date);
        }
      });
    }
  });
 
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
                     Vessel Audit
                  </Typography>
                  <Divider />
                  <Box sx={{ mt: 1 }}>
                    <Grid container spacing={2} rowSpacing={1} sx={{ mb: 2 }}>
                      <Grid item xs={6} sm={6}>
                        <Box>
                          {" "}
                          Title : {" "}<Box component="span">{title}</Box>
                        </Box>

                        <Box sx={{ mb: 1, mt: 1 }}>
                          Company Name :{" "}
                          <Box component="span">{companyName}</Box>
                        </Box>
                        <Box sx={{ mb: 1, mt: 1 }}>
                          Audit: {" "}
                          <Box component="span">
                            {category}</Box>
                        </Box>
                        <Box>
                          file : <Box component="span">
                          <Grid container spacing={2}>
                              {showImages.map((item:any, index:any) => (
                                <Grid item xs={12} sm={6} md={6} key={index}>
                                  <embed
                                    src={item}
                                    type="application/pdf"
                                    width="100%"
                                    height="300px"
                                  />
                                  Share Document
                                </Grid>
                              ))}
                            </Grid>
                            </Box>
                        </Box>
                        <Box sx={{ mb: 1, mt: 1 }}>
                          Audit date: {" "}
                          <Box component="span">
                            {date}</Box>
                        </Box>
                      </Grid>
                    </Grid>
                     
            

                    <Divider />
                    <Toolbar sx={{ ml: 0, pl: "0 !important" }}>
                      <Button
                        variant="contained"
                        component={Link}
                        to={'/vessel/view/' + companyId}
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
