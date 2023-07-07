import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { store } from "../../redux/store";
import {
  getRolehasPermissions,
  login,
  UserMgmtSlice,
} from "../../redux/store/reducers/slices/UserSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../common/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import logo from "../common/images/logo.png";

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const currentUser: any = useSelector((state: any) => state.user.currUser);

  function IsLoggedIn() {
    let access_token = localStorage.getItem("access_token");
    return access_token != "" && access_token != null ? true : false;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };
    store.dispatch(login(formData)).then((res: any) => {
      if (res.payload.status == true) {
        let access_token = res.payload.access_token;
        if (access_token != "" && access_token != "") {
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("role_id", res.payload.user.role_id);
          localStorage.setItem("user_id", res.payload.user.id);
          toast.success(res.payload.message);
          navigate("dashboard");
          setTimeout(function () {
            window.location.reload();
          }, 900);
        }
      } else {
        toast.error(res.payload.message);
        setErrorMessages(res.payload.message)
      }
    });
  };

  const renderErrorMessage = () =>
    errorMessages && <div className="error">{errorMessages}</div>;

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://www.bilogistik.com/wp-content/uploads/2019/03/portacontenedores.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ height: "80px", textAlign: "center" }}>
              <img src={logo} alt="img" style={{ maxHeight: "100%" }} />
            </div>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h6">
              Welcome to the EnerGeo Alliance SEIS Database
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Typography
                  component="h2"
                  variant="subtitle1"
                  color="primary"
                  sx={{ textAlign: "center" }}
                  gutterBottom
                >
                  If you require an account or need assistance, please contact
                  Jameson White at{" "}
                  <Link href="#">jwhite@energeoalliance.org</Link>
                </Typography>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                {/* <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
              <Footer />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
