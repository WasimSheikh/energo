import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SettingsIcon from '@mui/icons-material/Settings';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link } from "react-router-dom";
import PublicIcon from '@mui/icons-material/Public';
import logo from '../common/images/logo.png'
import capitalizeFirstLetter from '../utils/FormUtils';
import { store } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { getRolehasPermissions, UserMgmtSlice } from '../../redux/store/reducers/slices/UserSlice';

const Navigation = (): JSX.Element => {
  const drawerWidth: number = 240;
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  ); 

  const [open, setOpen] = useState(true);
  const currentUser: any = useSelector((state: any) => state.user.currUser);
  const user_id = localStorage.getItem('user_id')
  const [companyIndex, setCompanyIndex] = useState(false);
  const [indexUsers, setIndexUsers] = useState(false);
  const [indexNotifications, setindexNotifications] = useState(false);
  const [indexSecurityManagment, setIndexSecurityManagment] = useState(false);
  const [indexSctivityLogs, setIndexSctivityLogs] = useState(false);
  const [indexRoles, setIndexRoles] = useState(false);
  const [indexPermissions, setIndexPermissions] = useState(false);
  const [indexCountries, setIndexCountries] = useState(false);
  const [indexStates, setIndexStates] = useState(false);
  const [indexCities, setIndexCities] = useState(false);
  const [indexDashboard, setIndexDashboard] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  function addPermission(){
        var permissions:any = localStorage.getItem('permissions')
        var allPermission:any =JSON.parse(permissions)?JSON.parse(permissions):[];
        if(allPermission.length != 0){
        allPermission.forEach((per:any) => {
          if(capitalizeFirstLetter(per.flag) == "Companies"){
            if(per.name == "Index"){
              setCompanyIndex(true)
            }
          }
          if(capitalizeFirstLetter(per.flag) == "Users"){
            if(per.name == "Index"){
              setIndexUsers(true)
            }
          }
          if(capitalizeFirstLetter(per.flag) == "Countries"){
            if(per.name == "Index"){
              setIndexCountries(true)
            }
          }
          if(capitalizeFirstLetter(per.flag) == "States"){
            if(per.name == "Index"){
              setIndexStates(true)
            }
          }
          if(capitalizeFirstLetter(per.flag) == "Cities"){
            if(per.name == "Index"){
              setIndexCities(true)
            }
          }
          if(capitalizeFirstLetter(per.flag) == "Notifications"){
            if(per.name == "Index"){
              setindexNotifications(true)
            }
          }
          if(capitalizeFirstLetter(per.flag) == "Dashboard"){
            if(per.name == "Index"){
              setIndexDashboard(true)
            }
          }
          if(capitalizeFirstLetter(per.flag) == "Activity Logs"){
            if(per.name == "Index"){
              setIndexSctivityLogs(true)
            }
          }
          if(capitalizeFirstLetter(per.flag) == "Security Managment"){
            if(per.name == "Index"){
              setIndexSecurityManagment(true)
            }
          }
        });
      }
  }
  
  useEffect(()=>{
      addPermission();
  },[])

    return <>
     <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
         <div style={{height: '60px' ,textAlign:'center'}}>
          <img src={logo} alt="img" style={{maxHeight:'100%'}} />
         </div>
          <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
          <React.Fragment>
         {indexDashboard && <ListItemButton component={Link} to="/dashboard" >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
            <ListItemText primary="Dashboard" />
            </ListItemButton>}
           {companyIndex && <ListItemButton component={Link} to="/companies" >
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="Companies"  />
            </ListItemButton>}
           {indexUsers && <ListItemButton component={Link} to="/users" >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>}
            {/* <ListItemButton component={Link} to="/documents" >
              <ListItemIcon>
                <FileCopyIcon />
              </ListItemIcon>
              <ListItemText primary="Documents" />
            </ListItemButton> */}
            {indexNotifications && <ListItemButton component={Link} to="/notifications" >
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItemButton>}
            {indexSecurityManagment && <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Security Managment" />
            </ListItemButton>}
            {indexSctivityLogs && <ListItemButton>
              <ListItemIcon>
                <ContentPasteSearchIcon />
              </ListItemIcon>
              <ListItemText primary="Activity Logs" />
            </ListItemButton>}

            {user_id == '1' && <ListItemButton component={Link} to="/roles">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Roles" />
            </ListItemButton>}
         {user_id == '1' && <ListItemButton component={Link} to="/permissions">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Permissions" />
            </ListItemButton>}
            {indexCountries && <ListItemButton component={Link} to="/countries">
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary="Countries" />
            </ListItemButton>}
            {indexStates && <ListItemButton component={Link} to="/states">
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary="States" />
            </ListItemButton>}
           {indexCities && <ListItemButton component={Link} to="/cities">
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary="Cities" />
            </ListItemButton>}
            </React.Fragment>
          </List>
        </Drawer>
    </>;
  };
export default Navigation;


