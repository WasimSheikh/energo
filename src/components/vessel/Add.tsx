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
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  createVessel,
  getCompanies,
} from "../../redux/store/reducers/slices/UserSlice";
import { store } from "../../redux/store";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const mdTheme = createTheme();

function CompanyAdd() {
  const navigate = useNavigate();

  const [state, setState] = useState("");
  const [company_id, setCompanyId] = useState("");
  const [logo, setLogo] = useState("");
  const [companies, setCompanies] = React.useState([]);
  const [errorMessages, setErrorMessages] = useState("");
  const [dirtyFields, setDirtyFields] = useState({
    state: false,
    company_id: false,
  });
  const isValidData = (): boolean => {
    const validateFields = ifEmpty(state);
    return validateFields;
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    {
      const formData = new FormData();
      formData.append("title", state);
      formData.append("company_id", company_id);
      formData.append("picture", logo);
      store.dispatch(createVessel(formData)).then((res: any) => {
        if (res.payload?.data?.status == true) {
          toast.success(res.payload?.data?.message);
          navigate("/companies");
        } else {
          toast.error(res.payload?.data?.message);
        }
      });
    }
  };
  useEffect(() => {
    store.dispatch(getCompanies()).then((res: any) => {
      if (res && res.payload.companies) {
        setCompanies(res.payload.companies);
      }
    });
  }, []);
  const selectChange = (event: SelectChangeEvent) => {
    setCompanyId(event.target.value);
  };
  const renderErrorMessage = () =>
    errorMessages && <div className="error">{errorMessages}</div>;

  const ifEmpty = (val: string): boolean => {
    return val != undefined && val != "" && val.length > 0; // return true;
  };

  const getError = (msg: string): JSX.Element => {
    return (
      <span className="text-13 d-inline-block ml-1 text_13 text-danger">
        {msg}
      </span>
    );
  };
  const fileInput = useRef<any | null>(null);

  console.log(company_id);
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
                    Add Vessel
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
                            // onChange={selectChange}
                            onChange={(e) => {
                              setCompanyId(e.target.value);
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                company_id: !ifEmpty(e.target.value),
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
                      </Grid>
                      <Grid item xs={6} sm={6} sx={{ mb: 2 }}>
                        <input
                          type="file"
                          name="picture"
                          id="picture"
                          ref={fileInput}
                          onChange={(e: any) => {
                            setLogo(e.target.files[0]);
                          }}
                        
                          className="form-control"
                        />
                      </Grid>
                    </Grid>
                    <Divider />
                    <Toolbar sx={{ ml: 0, pl: "0 !important" }}>
                      <Button
                        disabled={!isValidData()}
                        onClick={handleSubmit}
                        type="submit"
                        variant="contained"
                      >
                        Submit
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
export default function Add() {
  return <CompanyAdd />;
}
