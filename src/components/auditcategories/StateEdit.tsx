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
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getCountries,
  getCountryStates,
  updateCity,
  getCity,
  getCoatery,
  updateCategory,
} from "../../redux/store/reducers/slices/UserSlice";
import { store } from "../../redux/store";
import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { toast } from "react-toastify";

const mdTheme = createTheme();

export default function StateEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const {companyId} = useParams();
  const [country_id, setCountry] = useState("");
  const [setSate, setState] = useState("");
  const [title, setTitle] = useState("");
  const [cityID, setCityID] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const [onload, setOnload] = useState(false);
  const [countries, setCountries] = useState([]);
  const [id, setId] = useState("");
  const [stateId, setStateId] = useState([]);
  const [dirtyFields, setDirtyFields] = useState({
    country_id: false,
    stateId: false,
    title: false,
  });
 
  const renderErrorMessage = () =>
    errorMessages && <div className="error">{errorMessages}</div>;

  const ifEmpty = (val: string): boolean => {
    return val !== undefined && val.length > 0; // return true;
  };

  const getError = (msg: string): JSX.Element => {
    return (
      <span className="text-13 d-inline-block ml-1 text_13 text-danger">
        {msg}
      </span>
    );
  };
  const isValidData = (): boolean => {
    const validateFields = ifEmpty(title);

    return validateFields;
  };
  const selectCuntry = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
    getCountryStatesByCountry(event.target.value);
  };
  const selectState = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  function getCountrieData() {
    if (countries.length == 0) {
      store.dispatch(getCountries()).then((res: any) => {
        setCountries(res.payload.countries);
      });
    }
  }
  function getCountryStatesByCountry(e: any) {
    const formDate = {
      country_id: e,
    };
    store.dispatch(getCountryStates(formDate)).then((res: any) => {
      setStateId(res.payload.states);
    });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isValidData()) {
      const formData = {
       title: title,
       id:id
      };

      store.dispatch(updateCategory(formData)).then((res: any) => {
        if (res.payload.status == true) {
          toast.success(res.payload.message);
          navigate(`/auditcategories/list`);
     
        } else {
          toast.error(res.payload?.message);
        }
      });
    }
  };
  function getCityById() {
    const formDate = {
      id: params.categoryId,
    };
    store.dispatch(getCoatery(formDate)).then((res: any) => {
      setTitle(res.payload.audit_category.title);
      setId(res.payload.audit_category.id)
    });
  }

  useEffect(() => {
    getCountrieData();
    getCityById();
  }, []);
  console.log(title, "audit_category");
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
                    Edit Category
                  </Typography>
                  <Divider />
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    {/* <Grid container spacing={2} rowSpacing={1} > */}

                    <Grid item xs={6} sm={6} mt={2}>
                      <TextField
                        margin="normal"
                        id="title"
                        required
                        name="title"
                        label="Category"
                        fullWidth
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                          setDirtyFields((dirty) => ({
                            ...dirty,
                            title: !ifEmpty(e.target.value),
                          }));
                        }}
                      />
                      {dirtyFields["title"] && getError("Category is required")}
                    </Grid>
                    {/* </Grid> */}
                    <Divider />
                    <Toolbar sx={{ ml: 0, pl: "0 !important" }}>
                      <Button
                        disabled={!isValidData()}
                        type="submit"
                        variant="contained"
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        component={Link}
                        to="/auditcategories/list"
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
