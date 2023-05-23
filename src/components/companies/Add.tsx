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
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link, useNavigate } from "react-router-dom";
import {
  createCompany,
  getCities,
  getCountries,
  getCountryStates,
} from "../../redux/store/reducers/slices/UserSlice";
import { store } from "../../redux/store";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
const mdTheme = createTheme();

function CompanyAdd() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [countries, setCountries] = useState([]);
  const [src, setSrc] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isHeadauator, setIsHeadauator] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const [stateId, setStateId] = useState([]);
  const [cityId, setCityId] = useState([]);
  const [dirtyFields, setDirtyFields] = useState({
    email: false,
    companyName: false,
    website: false,
    phone: false,
    address: false,
    street: false,
    city: false,
    country: false,
    logo: false,
    // isHeadauator:false,
    first_name: false,
    last_name: false,
    zipcode: false,
    state: false,
  });
  const isValidData = (): boolean => {
    const validateFields = ifEmpty(
      companyName &&
        website &&
        phone &&
        address &&
        street &&
        country &&
        email &&
        postalCode &&
        isHeadauator
    );
    return validateFields;
  };

  var token = localStorage.getItem("access_token");

  var token = localStorage.getItem("access_token");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    };
    const formData = new FormData();
    formData.append("title", companyName);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("website", website);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zipcode", postalCode);
    formData.append("country", country);
    formData.append("logo", src);
    formData.append("isHeadquater", isHeadauator);
    formData.append("postalcode", postalCode);

    const imageFile = document.getElementById(
      "imageId"
    ) as HTMLInputElement | null;
    if (imageFile?.files?.[0]) {
      formData.append("image", imageFile.files[0]);
    }

    axios
      .post(
        "https://laravel.cppatidar.com/energo/backend/api/createCompany",
        formData,
        { headers }
      )
      .then((res: any) => {
        if (res.data.status == true) {
          toast.success(res.data.message);
          navigate("/companies");
        } else {
          toast.error(res.data.message);
        }
      });
  };

  const fileInput = useRef<any | null>(null);
  const renderErrorMessage = () =>
    errorMessages && <div className="error">{errorMessages}</div>;

  const ifEmpty = (val: string): boolean => {
    return val !== undefined && val.length > 0; // return true;
  };
  function getCountryStatesByCountry(e: any) {
    const formDate = {
      country_id: e,
    };
    store.dispatch(getCountryStates(formDate)).then((res: any) => {
      setStateId(res.payload.states);
    });
  }

  function getCountrieData() {
    if (countries.length == 0) {
      store.dispatch(getCountries()).then((res: any) => {
        setCountries(res.payload.countries);
      });
    }
  }
  function getCityiesData() {
    if (countries.length == 0) {
      store.dispatch(getCities()).then((res: any) => {
       setCityId(res.payload.cities);
      });
    }
  }

  const getError = (msg: string): JSX.Element => {
    return (
      <span className="text-13 d-inline-block ml-1 text_13 text-danger">
        {msg}
      </span>
    );
  };
  const selectCuntry = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
    getCountryStatesByCountry(event.target.value);
  };

  const selectState = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };
  const selectCity = (event: SelectChangeEvent) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    getCountrieData();
    getCityiesData();
  });
  console.log(src, "ahjfads");
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
            {renderErrorMessage()}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Add Company
                  </Typography>
                  <Divider />
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <Grid container spacing={2} rowSpacing={1}>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          id="first_name"
                          required
                          name="first_name"
                          label="First Name"
                          fullWidth
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              first_name: !ifEmpty(e.target.value),
                            }));
                          }}
                        />

                        {dirtyFields["first_name"] &&
                          getError("FirstName is requried")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          id="last_name"
                          required
                          name="last_name"
                          label="Last Name"
                          fullWidth
                          onChange={(e) => {
                            setLastName(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              last_name: !ifEmpty(e.target.value),
                            }));
                          }}
                        />

                        {dirtyFields["last_name"] &&
                          getError("LastName is requried")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          id="company_name"
                          required
                          name="company_name"
                          label="Company Name"
                          fullWidth
                          onChange={(e) => {
                            setCompanyName(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              companyName: !ifEmpty(e.target.value),
                            }));
                          }}
                        />

                        {dirtyFields["companyName"] &&
                          getError("Company Name is required ")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          id="website"
                          required
                          name="website"
                          label="Website"
                          fullWidth
                          onChange={(e) => {
                            setWebsite(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              website: !ifEmpty(e.target.value),
                            }));
                          }}
                        />

                        {dirtyFields["website"] &&
                          getError("Website is required ")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email"
                          name="email"
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              email: !ifEmpty(e.target.value),
                            }));
                          }}
                        />
                        {dirtyFields["email"] && getError("Email is required ")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="phone"
                          label="Phone"
                          name="phone"
                          onChange={(e) => {
                            setPhone(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              phone: !ifEmpty(e.target.value),
                            }));
                          }}
                        />

                        {dirtyFields["phone"] && getError("Phone is required ")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="address"
                          label="Address"
                          name="address"
                          onChange={(e) => {
                            setAddress(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              address: !ifEmpty(e.target.value),
                            }));
                          }}
                        />

                        {dirtyFields["address"] &&
                          getError("Address is required ")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="street 1"
                          label="Address 2"
                          name="address2"
                          onChange={(e) => {
                            setStreet(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              street: !ifEmpty(e.target.value),
                            }));
                          }}
                        />
                        {dirtyFields["street"] &&
                          getError("Street is required ")}
                      </Grid>
                    
                      <Grid item xs={6} sm={6} mt={2}>
                        <FormControl fullWidth>
                          <InputLabel id="Country">Country</InputLabel>
                          <Select
                            labelId="Country"
                            required
                            id="Country"
                            value={country}
                            label="Country"
                            onChange={selectCuntry}
                          >
                            <MenuItem value="">-Select-</MenuItem>
                            {countries.map((city: any) => (
                              <MenuItem key={city.id} value={city.id}>
                                {city.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6} mt={2}>
                        <FormControl fullWidth>
                          <InputLabel id="State">State</InputLabel>
                          <Select
                            labelId="State"
                            required
                            id="State"
                            value={state}
                            label="State"
                            onChange={selectState}
                          >
                            <MenuItem value="">-Select-</MenuItem>
                            {stateId?.map((item: any) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={6} sm={6} mt={2}>
                        <FormControl fullWidth>
                          <InputLabel id="State">City</InputLabel>
                          <Select
                            labelId="State"
                            required
                            id="City"
                            value={city}
                            label="City"
                            onChange={selectCity}
                          >
                            <MenuItem value="">-Select-</MenuItem>
                            {cityId?.map((item: any) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="city"
                          label="City"
                          name="city"
                          onChange={(e) => {
                            setCity(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              city: !ifEmpty(e.target.value),
                            }));
                          }}
                        />

                        {dirtyFields["city"] && getError("City is required ")}
                      </Grid> */}

                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="zipcode"
                          label="Zipcode"
                          name="postalCode"
                          onChange={(e) => {
                            setPostalCode(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              zipcode: !ifEmpty(e.target.value),
                            }));
                          }}
                        />

                        {dirtyFields["zipcode"] &&
                          getError("Zipcode is required ")}
                      </Grid>

                      <Grid item xs={2} sm={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e) => {
                                setIsHeadauator(e.target.value);
                              }}
                              name="headquater"
                              value="1"
                            />
                          }
                          label="Company Headquater Office"
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <input
                          type="file"
                          ref={fileInput}
                          onChange={(e: any) => {
                            setSrc(e.target.files[0]);
                          }}
                          className="form-control"
                        />
                      </Grid>
                      <Grid item xs={6} sm={6}></Grid>
                    </Grid>

                    <Divider />
                    <Toolbar sx={{ ml: 0, pl: "0 !important" }}>
                      <Button
                        disabled={!isValidData()}
                        type="submit"
                        variant="contained"
                      >
                        Submit
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        component={Link}
                        to="/companies"
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
