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
} from "../../redux/store/reducers/slices/UserSlice";
import { store } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';
function CompanyView() {
  const mdTheme = createTheme();
  const params = useParams();
  const [id, setId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [logo, setLogo] = useState("");
  const [showImages, setShowImages] = useState([]);
  const [onload, setOnload] = useState(false);
  const companyId = window.location.href.split("/")[5];
  const [date, setDate] = useState("");
  useEffect(() => {
    if (onload == false) {
      const auditId = params.auditId;
      const formData = { id:  auditId };
      store.dispatch(getinspectionAudit(formData)).then((res: any) => {
        console.log(res, "res");
        setOnload(true);
        if (res && res.payload) {
          setTitle(res.payload.companies_audit.title);
          setCompanyName(res.payload.companies_audit.company_title);
          setId(res.payload.id);
          setCategory(res.payload.companies_audit.category_title);

          setShowImages(res?.payload?.companies_audit?.picture);
          setDate(res?.payload?.companies_audit?.audit_date);
        }
      });
    }
  });
  interface ShowImagesProps {
    showImages: string[];
  }
  const theme = useTheme();
const data = [
  "https://www.africau.edu/images/default/sample.pdf",
  "https://www.africau.edu/images/default/sample.pdf",
 
]
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
                    View Inspection
                  </Typography>
                  <Divider />
                  <Box sx={{ mt: 1 }}>
                    <Grid container spacing={2} rowSpacing={1} sx={{ mb: 2 }}>
                      <Grid item xs={6} sm={6}>
                        <Box>
                          {" "}
                          Title : <Box component="span">{title}</Box>
                        </Box>

                        <Box sx={{ mb: 1, mt: 1 }}>
                          Company Name :{" "}
                          <Box component="span">{companyName}</Box>
                        </Box>
                        <Box sx={{ mb: 1, mt: 1 }}>
                          Audit: <Box component="span">{category}</Box>
                        </Box>
                        <Box>
                          Download file :{" "}
                          <Box
                            component="span"
                            sx={{
                              display: "flex",
                              gap: "16px",
                              width: "600px",
                            }}
                          >
                            {/* {showImages.map((url:any, index:any) => (
        <embed src={url} key={index} type="application/pdf" width="100%" height="300px" />
      ))} */}
                            <Grid container spacing={2}>
                              {data.map((item, index) => (
                                <Grid item xs={12} sm={6} md={6} key={index}>
                                  <embed
                                    src={item}
                                    type="application/pdf"
                                    width="100%"
                                    height="300px"
                                  />
                               
                              <Box sx={{display:"flex"}}>
                              <Box>
                       Share on 
                        </Box>  
                        <Box sx={{ marginLeft:"10px"}}>

                       
                              <EmailShareButton url={item} subject="Check out my PDF!">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#6943d0" viewBox="0 0 256 256"><path d="M224,56l-96,88L32,56Z" opacity="0.2"></path><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"></path></svg>
            </EmailShareButton>


      <FacebookShareButton url={item} quote="Check out my PDF!">
       <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#6943d0" viewBox="0 0 256 256"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"></path><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path></svg>
      </FacebookShareButton>

      <TwitterShareButton url={item} title="Check out my PDF!">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#6943d0" viewBox="0 0 256 256"><path d="M240,72l-32,32c-4.26,66.84-60.08,120-128,120-32,0-40-12-40-12s32-12,48-36c0,0-55.15-32-47.22-120,0,0,39.66,40,87.22,48V88c0-22,18-40.27,40-40a40.74,40.74,0,0,1,36.67,24Z" opacity="0.2"></path><path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.65,48.65,0,0,0,168.1,40a46.87,46.87,0,0,0-33.74,13.7A47.87,47.87,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.3,47.79,9.57,79.77,22,98.18a110.92,110.92,0,0,0,21.89,24.2C61.43,195.2,37.45,204.41,37.2,204.51a8,8,0,0,0-3.85,11.93c.74,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.68,0,129.72-54.42,135.76-124.44l29.9-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.52-6.25,27.56-17,37.88-32.48a8,8,0,0,0-2.61-11.34c-.13-.08-12.86-7.74-24.48-25.29C54.54,124.11,48,100.38,48,73.09c16,13,45.25,33.18,78.69,38.8A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.89,30.89,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path></svg>
      </TwitterShareButton>
      </Box>
                              </Box>
  
                                </Grid>
                              ))}
                            </Grid>
                            {/* <img src={showImages} style={{width:"auto", height:"100px"}} alt="dsaff"/> */}
                          </Box>
                        </Box>
                        <Box sx={{ mb: 1, mt: 1 }}>
                          Audit date: <Box component="span">{date}</Box>
                        </Box>
                      </Grid>
                    </Grid>

                    <Divider />
                    <Toolbar sx={{ ml: 0, pl: "0 !important" }}>
                      <Button
                        variant="contained"
                        component={Link}
                        to={"/companies/view/" + companyId}
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
