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
import DatePicker from "react-datepicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  updateCompany,
  getCompany,
  getVessels,
  getVessel,
  getCompanies,
  updateVessel,
  getinspectionAudit,
  getCategory,
  updateInspection,
  getvesselAudit,
  updateAuditVessel,
} from "../../redux/store/reducers/slices/UserSlice";
import { store } from "../../redux/store";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const mdTheme = createTheme();

function VesselEdit() {
  const params = useParams(); 
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [logo, setLogo] = useState("");
  const [vessel, setVessel] = useState("");
  const [state, setState] = useState("");
  const [documents, setFile] = React.useState<any | null>(null);
  const [companies, setCompanies] = React.useState([]);
  const [onload, setOnload] = useState(false);
  const [imagebinary, setImagebinary] = useState("");
  const [image, setImage] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const [category, setCategory] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [src, setSrc] = useState("");
  const [date, setDate] = useState('');
  const companyId = window.location.href.split("/")[5];
  const [dirtyFields, setDirtyFields] = useState({
    state: false,
    company_id: false,
  });

  const isValidData = (): boolean => {
    const validateFields = ifEmpty(vessel);
    return validateFields;
  };
  const fileInput = useRef<any | null>(null);
  function formatDate(dateString:any) {
    const date = new Date(dateString);
    // const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    return formattedDate;
  }
  const dateString = selectedDate;
  const formattedDate = formatDate(dateString);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("vessel_id", "4");
     formData.append("title", state);
     for (let i = 0; i < src.length; i++) {
      formData.append('picture', src[i]);
    }

    formData.append("audit_date", formattedDate);
    formData.append("category_id",  category);
    store.dispatch(updateAuditVessel(formData)).then((res: any) => {
      if (res?.payload?.data?.status == true) {
        toast.success(res.payload?.data?.message);
        navigate(`/vessel/view/${companyId}`);
      } else {
        toast.error(res.payload?.message);
      }
    });
  };
  const defaultDate:any = new Date();
  useEffect(() => {
    setSelectedDate(defaultDate);
  }, []);
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };
  function getCategoryList() {
    store.dispatch(getCategory()).then((res: any) => {
     
      if (res.payload.status == true) {
        setCities(res.payload?.vessels_audit);
      } else {
        toast.error(res.payload.message);
      }
    });
  }
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
  const auditnewId = window.location.href.split("/")[5];
  useEffect(() => {
    if (onload == false) {
      setOnload(true);
      let vesselauditId = params.auditId;
      const formData = { id: vesselauditId };
      store.dispatch(getvesselAudit(formData)).then((res: any) => {
          setId(res?.payload?.vessel_audit.id);
          setVessel(res?.payload?.vessel_audit?.vessel_id);
          setState(res?.payload?.vessel_audit?.title);
          setImage(res?.payload?.vessel_audit?.picture);
          setCategory(res?.payload?.vessel_audit?.category_id);
          setDate(res?.payload?.vessel_audit?.audit_date);
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
  useEffect(() => {
    getCategoryList();
  }, []);
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
                    Edit Vessel Audit
                  </Typography>
                  <Divider />
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <Grid container spacing={2} rowSpacing={1}>
                      <Grid item xs={6} sm={6} sx={{ px: 3 }}>
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
                      <Grid item xs={6} sm={6} mt={2} sx={{ px: 3 }}>
                        <FormControl fullWidth>
                          <InputLabel id="company_name_label">
                            Category Name
                          </InputLabel>
                          <Select
                            labelId="company_name_label"
                            required
                            id="company_name"
                            value={category}
                            label="Company Name"
                            // onChange={selectChange}
                            onChange={(e) => {
                              setCategory(e.target.value);
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                company_id: !ifEmpty(e.target.value),
                              }));
                            }}
                          >
                            <MenuItem value="">-Select-</MenuItem>
                            {cities.map((opt: any) => (
                              <MenuItem key={opt.id} value={opt.id}>
                                {opt.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6} mt={1} sx={{ px: 3 }}>
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          placeholderText="Select a Audit date"
                          className="date_new"
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} mt={1} sx={{ px: 3 }}>
                      <input
                          type="file"
                          accept=".pdf, .xls, .xlsx, .csv"
                          ref={fileInput}
                          multiple
                          onChange={(e: any) => {
                            setSrc(e.target.files);
                          }}
                          className="form-control"
                        />
                      
                      </Grid>
                    </Grid>
                    <Divider sx={{ mt: 2 }} />
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
export default function Edit() {
  return <VesselEdit />;
}
