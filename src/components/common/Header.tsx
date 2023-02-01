import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Link , useParams ,useNavigate} from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../common/common.css'
import PersonIcon from '@mui/icons-material/Person';


function capitalizeFirstLetter(string:string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Header = (): JSX.Element => {
  let urlElements = window.location.href.split('/')[3]
  const drawerWidth: number = 240;
  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }
  
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);



  const profileClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const profileClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user_id")
    localStorage.removeItem("role_id")
    toast.success("Logout successfully")
    navigate('/')
  }

    return <>
    <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
            <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
            { capitalizeFirstLetter(urlElements) }
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <AccountCircleIcon />
              </Badge>
            </IconButton> */}
              <Button className="btn"
                id="basic-button"
                aria-controls={open1 ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open1 ? 'true' : undefined}
                onClick={profileClick}>
                <Avatar sx={{ bgcolor: "#bdbdbd" }} ><PersonIcon/></Avatar>
              </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open1}
                onClose={profileClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
               style={{top:"40px",left: '90%'}}>
                <MenuItem  component={Link} to="/profile">Profile</MenuItem>
                <MenuItem onClick={Logout}>
                  Logout
                  </MenuItem>

              </Menu>
          </Toolbar>
        </AppBar>
    </>;
  };
  
export default Header;