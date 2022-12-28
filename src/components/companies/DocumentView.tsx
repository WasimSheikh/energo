import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Navigation from "../common/Navigation";
import Divider from "@mui/material/Divider";
import Footer from "../common/Footer";
import Header from "../common/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { Link, useLocation } from "react-router-dom";
import { store } from "../../redux/store";
import {
  getDocuments,
  shareDocuments,
} from "../../redux/store/reducers/slices/UserSlice";
// import DocumentCompany from './components/companies/Documents';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const mdTheme = createTheme();

type addData ={
  route: any
  
}

export default function ShareAdd(props:addData) {
  const params = useParams();
  const location = useLocation();
  console.log(props ,"oooooooooo")
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [documents, setDocuments] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [errorMessages, setErrorMessages] = useState("");
  const cards = [1, 2];

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = {
      name: name,
      email: email,
      description: description,
      documents: documents,
    };
    store.dispatch(shareDocuments(formData)).then((res: any) => {
      if (res.payload.status == true) {
        setErrorMessages("");
        //const that = this.context.router.history.push("/dashboard");
      } else {
        setErrorMessages(res.payload?.message);
      }
    });
  };

  const childToParent = () => {
    alert("This is an alert from the Child Component")
  }

  const data = {
    company_id: 6,
    folder_id: 16,
  };

  useEffect(() => {
    console.log(params.documentId,"params")
    store.dispatch(getDocuments(data)).then((res: any) => {
      console.log(res.payload.folders.media, "jjjjjjjjjjmedia");
      setDocuments(res.payload.folders.media)
      setFolderName(res.payload.folders.title)
    });

  },[]);
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
                    Document View / {folderName}
                  </Typography>
                  <Divider />
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <Grid container spacing={2} rowSpacing={1}>
                      <Grid item xs={12} sx={{ mb: "20px !important" }}>
                        <div className="row">
                        {documents.map((res:any)=>{
                          return(
                            <div className="col-md-3 mb-2" key={res.id}>
                            <div className="card">
                              <a href={res.original_url} download>
                              <img
                              className="card-img-top mh-100 mw-100"
                              src={res.original_url} 
                              alt="Card image cap" style={{height: '150px'}}/>
                              </a>
                          
                             <div className="card-body text-center">
                             <Link to={res.original_url} target="_blank" download>Download</Link>
                             </div>
                          </div>
                            </div>
                          )
                        })}
                        </div>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                  <Toolbar sx={{ ml: 0, pl: "0 !important" }} className="mt-4">
                    <Button
                      variant="contained"
                      component={Link}
                      to="/companies/document/6"
                      sx={{ ml: 1 }}
                    >
                      Cancel{" "}
                    </Button>
                  </Toolbar>
                </Paper>
              </Grid>
            </Grid>
            <Footer />
          </Container>
        </Box>
      </Box>
      {/* <DocumentList childToParent={childToParent}/> */}
    </ThemeProvider>
  );
}
// export default function Add() {
//   return <ShareAdd />;
// }
