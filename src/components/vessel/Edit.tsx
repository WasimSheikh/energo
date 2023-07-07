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
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  updateCompany,
  getCompany,
  getVessels,
  getVessel,
  getCompanies,
  updateVessel,
} from "../../redux/store/reducers/slices/UserSlice";
import { store } from "../../redux/store";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const mdTheme = createTheme();

function VesselEdit() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [logo, setLogo] = useState("");
  const [company_id, setCompanyId] = useState("");
  const [state, setState] = useState("");
  const [documents, setFile] = React.useState<any | null>(null);
  const [companies, setCompanies] = React.useState([]);
  const [onload, setOnload] = useState(false);
  const [imagebinary, setImagebinary] = useState("");
  const [image, setImage] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const [dirtyFields, setDirtyFields] = useState({
    state: false,
    company_id: false,
  });

  const isValidData = (): boolean => {
    const validateFields = ifEmpty(company_id);
    return validateFields;
  };
  const fileInput = useRef<any | null>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("company_id", company_id);

    formData.append("title", state);
    Array.from(imagebinary).forEach((file, index) => {
      formData.append(`picture`, file);
    });
    store.dispatch(updateVessel(formData)).then((res: any) => {
      if (res?.payload?.data?.status == true) {
        toast.success(res.payload?.data?.message);
        navigate("/vessel");
      } else {
        toast.error(res.payload?.message);
      }
    });
  };

  const renderErrorMessage = () =>
    errorMessages && <div className="error">{errorMessages}</div>;

  const ifEmpty = (val: string): boolean => {
    return val !== undefined && val.length > 0; // return true;
  };
  const selectChange = (event: SelectChangeEvent) => {
    setCompanyName(event.target.value);
  };

  const getError = (msg: string): JSX.Element => {
    return (
      <span className="text-13 d-inline-block ml-1 text_13 text-danger">
        {msg}
      </span>
    );
  };

  useEffect(() => {
    if (onload == false) {
      setOnload(true);
      const vesselId = window.location.href.split("/")[5];
      const formData = { id: vesselId };
      store.dispatch(getVessel(formData)).then((res: any) => {
        if (res && res.payload) {
          setId(res.payload.vessel?.id);
          setCompanyId(res.payload.vessel?.company_id);
          setState(res?.payload?.vessel?.title);
          setImage(res?.payload?.vessel?.media_url);
        }
      });
      store.dispatch(getCompanies()).then((res: any) => {
        if (res && res.payload.companies) {
          setCompanies(res.payload.companies);
        }
      });
    }
  });
  const handleChangeImgUrl = (e: any) => {
    setImagebinary(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
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
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Edit Vessel
                  </Typography>
                  <Divider />
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <Grid container spacing={2} rowSpacing={1}>
                      <Grid item xs={6} sm={6} mt={2}>
                        <FormControl fullWidth>
                          <InputLabel id="company_name_label">
                            Company Name
                          </InputLabel>
                          <Select
                            labelId="company_name_label"
                            required
                            id="company_name"
                            value={company_id}
                            label="Company Name"
                            onChange={selectChange}
                            onBlur={(e) => {
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                companyName: false,
                              }));
                            }}
                          >
                            <MenuItem value="">-Select-</MenuItem>
                            {companies.map((opt: any) => (
                              <MenuItem key={opt.id} value={opt.id}>
                                {opt.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="country"
                          label="Title"
                          name="country"
                          value={state}
                          onChange={(e) => {
                            setState(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              state: !ifEmpty(e.target.value),
                            }));
                          }}
                        />
                        {dirtyFields["state"] && getError("Title is required ")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <img
                          src={image}
                          alt="img"
                          style={{ height: "100px", width: "auto" }}
                          className="mt-0 mb-2 my-src-setup"
                        />
                        <input
                          type="file"
                          ref={fileInput}
                          onChange={handleChangeImgUrl}
                          className="form-control"
                          multiple
                        />

                        <br />
                      </Grid>
                    </Grid>
                    <Divider />
                    <Toolbar sx={{ ml: 0, pl: "0 !important" }}>
                      <Button
                        onClick={handleSubmit}
                        type="submit"
                        variant="contained"
                      >
                        Update
                      </Button>
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
export default function Edit() {
  return <VesselEdit />;
}
