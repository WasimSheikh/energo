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
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  updateCompany,
  getCompany,
  getCountryStates,
  getCountries,
  getCities,
} from "../../redux/store/reducers/slices/UserSlice";
import { store } from "../../redux/store";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const mdTheme = createTheme();

function CompanyEdit() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [countries, setCountries] = useState([]);
  const [lastName, setLastName] = useState("");
  const [isHeadauator, setIsHeadauator] = useState<any>(true);
  const [checked, setchecked] = useState("");
  const [state, setState] = useState("");
  const [imagebinary, setImagebinary] = useState("");
  const [onload, setOnload] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const [image, setImage] = useState("");
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
  });

  const isValidData = (): boolean => {
    const validateFields = ifEmpty(
      companyName &&
        website &&
        phone &&
        address1 &&
        address2 &&
        city &&
        country &&
        email &&
        postalCode
    );
    return validateFields;
  };
  const fileInput = useRef<any | null>(null);
  const handleChangeImgUrl = (e: any) => {
    setImagebinary(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isValidData()) {
      // const formData = {
      //   id: id,
      //   title: companyName,
      //   website: website,
      //   phone: phone,
      //   email: email,
      //   address: address1,
      //   street: address2,
      //   zipcode: postalCode,
      //   city: city,
      //   state: state,
      //   country: country,
      //   logo: imagebinary,
      //   is_headquater: isHeadauator,
      // };
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", companyName);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("website", website);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("address", address1);
      formData.append("street", address2);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("zipcode", postalCode);
      formData.append("country", country);
      formData.append("logo", imagebinary);
      formData.append("is_headquater", isHeadauator);

      store.dispatch(updateCompany(formData)).then((res: any) => {
        if (res.payload?.data?.status == true) {
          toast.success(res.payload?.data?.message);
          navigate("/companies");
        } else {
          toast.error(res.payload?.data?.message);
        }
      });
    }
  };
  function checkBoxValue(data: any) {
    setIsHeadauator(data.target.checked);
  }
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
  function getCountryStatesByCountry(e: any) {
    const formDate = {
      country_id: country,
    };
    store.dispatch(getCountryStates(formDate)).then((res: any) => {
      setStateId(res.payload.states);
    });
  }
  
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
    if (onload == false) {
      setOnload(true);
      const companyId = window.location.href.split("/")[5];
      console.log(companyId, "companyId");
      const formData = { id: companyId };
      store.dispatch(getCompany(formData)).then((res: any) => {
        if (res && res.payload) {
          setId(res.payload.company?.id);
          setCompanyName(res.payload.company?.title);
          setFirstName(res.payload.company?.first_name);
          setLastName(res.payload.company?.last_name);
          setEmail(res.payload.company?.email);
          setPhone(res.payload.company?.phone);
          setWebsite(res.payload.company?.website);
          setAddress1(res.payload.company?.address?.address);
          setAddress2(res.payload.company?.address?.street);
          setCity(res.payload.company.address?.city);
          setCountry(res.payload.company.address?.country);
          setState(res.payload.company.address?.state);
          setPostalCode(res.payload.company?.address?.zipcode);
          setImage(res.payload.company?.logo);
          setchecked(res.payload.company?.is_headquater);
          setIsHeadauator(res.payload.company?.is_headquater);
          if (res.payload.company.is_headquater == "1") {
            (document.getElementById("checkBox") as any).checked = true;
          } else {
            (document.getElementById("checkBox") as any).checked = false;
          }
        }
      });
    }
  });
  function getCountrieData() {
    if (countries.length == 0) {
      store.dispatch(getCountries()).then((res: any) => {
        setCountries(res.payload.countries);
      });
    }
  }
  function getCityiesData() {
    const formDate = {
      country_id: country,
      state_id: state,
    };

    store.dispatch(getCities(formDate)).then((res: any) => {
      setCityId(res.payload.cities);
    });
  }
  useEffect(() => {
    getCityiesData();
  }, [state]);
  useEffect(() => {
    getCountrieData();
  });

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
                    Edit Company
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
                          value={firstName}
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
                          value={lastName}
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
                          value={companyName}
                          onChange={(e) => {
                            setCompanyName(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              companyName: !ifEmpty(e.target.value),
                            }));
                          }}
                        />
                        {dirtyFields["companyName"] &&
                          getError("Company Name is requried")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          id="website"
                          required
                          name="website"
                          label="Website"
                          fullWidth
                          value={website}
                          onChange={(e) => {
                            setWebsite(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              website: !ifEmpty(e.target.value),
                            }));
                          }}
                        />
                        {dirtyFields["website"] &&
                          getError("Website is requried")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          value={email}
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
                        {dirtyFields["email"] && getError("Email is requried")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="phone"
                          value={phone}
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
                        {dirtyFields["phone"] && getError("Phone is requried")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          value={address1}
                          id="address"
                          label="Address"
                          name="address"
                          onChange={(e) => {
                            setAddress1(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              address: !ifEmpty(e.target.value),
                            }));
                          }}
                        />
                        {dirtyFields["address"] &&
                          getError("Address is requried")}
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          value={address2}
                          id="street 1"
                          label="Street"
                          name="address2"
                          onChange={(e) => {
                            setAddress2(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              street: !ifEmpty(e.target.value),
                            }));
                          }}
                        />
                        {dirtyFields["street"] &&
                          getError("Street is requried")}
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

                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          value={postalCode}
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
                          getError("Zipcode is requried")}
                      </Grid>

                      <Grid item xs={2} sm={6} mt={2}>
                        <FormControlLabel
                          control={
                            <input
                              type="checkbox"
                              name="headquater"
                              id="checkBox"
                              onChange={(e) => {
                                checkBoxValue(e);
                              }}
                            />
                          }
                          label="Company Headquater Office"
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                          style={{ fontSize: "50px" }}
                        />
                      </Grid>
                      <Box></Box>
                      <Grid item xs={6} sm={6}>
                        <input
                          type="file"
                          ref={fileInput}
                          onChange={handleChangeImgUrl}
                          className="form-control"
                          multiple
                        />

                        <img
                          src={image}
                          alt="img"
                          style={{ height: "100px", width: "auto" }}
                          className="mt-3 mb-2 my-src-setup img-thumbnail"
                        />
                        <br />
                      </Grid>
                   
                    </Grid>
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
export default function Edit() {
  return <CompanyEdit />;
}
