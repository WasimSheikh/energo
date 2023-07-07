import { createTheme, ThemeProvider ,styled} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Navigation from "../common/Navigation";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import "../common/common.css";
import Dialog from '@mui/material/Dialog';
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'

const mdTheme = createTheme();


function NotificationList() {
  const [openFolder, setFolder] = React.useState(false);
  const [documents, setFile] = React.useState<any | null>(null);

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));
function handleClickOpenFolder(){
  setFolder(true);
};

const handleCloseFolder = () => {
  setFolder(false);
  setFile(null);
};

function UploadDocument(e:any){
//   e.preventDefault();
//   var imageUrl:any;
//  var folderIds = JSON.stringify(folderId)
//  var company_id = params.companyId
//  var company_ids = JSON.stringify(company_id)
//   const formData:any = {
//     'company_id':company_id,
//     'folder_id':folderId,
//     'documents':documents,
//   }
//   store.dispatch(uploadeImage(formData)).then((res: any) => {
//     setCompanyFolder(res.response)
//     if (res.payload.status == true) {
//       toast.success(res.message)
//       navigate(`/companies/document/${params.companyId}`)
//       handleCloseFolder()
//     } else {
//       toast.error(res.message)
//     }
//   });           
};
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
                  <Box className="headingbutton" sx={{ mb: 1 }}>
                    <Typography
                      component="h2"
                      variant="h6"
                      color="primary"
                      gutterBottom
                    >
                     Notifications
                    </Typography>
                  </Box>
                  <Divider />
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="success">
                      <AlertTitle>Company Name</AlertTitle>
                      This is an Notification — <strong onClick={()=>{handleClickOpenFolder()}} >click here!</strong>
                    </Alert>
                    <Alert severity="success">
                      <AlertTitle>User Name</AlertTitle>
                      This is an Notification — <strong onClick={()=>{handleClickOpenFolder()}}>click here!</strong>
                    </Alert>
                    <Alert severity="success">
                      <AlertTitle>Test</AlertTitle>
                      This is an Notification — <strong onClick={()=>{handleClickOpenFolder()}}>click here!</strong>
                    </Alert>
                    <Alert severity="success">
                      <AlertTitle>New Test</AlertTitle>
                      This is an Notification — <strong onClick={()=>{handleClickOpenFolder()}}>click here!</strong>
                    </Alert>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
            <Footer />
          </Container>
        </Box>
      </Box>
      {/* ////////////////////// */}
      <BootstrapDialog onClose={handleCloseFolder} aria-labelledby="customized-dialog-title" open={openFolder} >
      <div className="card px-4">
      <div onSubmit={UploadDocument} className="form-group mt-2">
      <div className="card">
        <div className="card-content">
          <h3 className="card-title" id="title">
          </h3><h1>Company Name</h1>
          <p className="card-excerpt">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic.
          </p>
        </div>
      </div>
      </div>
     
    </div>
      </BootstrapDialog>
    </ThemeProvider>
  );
}
export default function Listing() {
  return <NotificationList />;
}
