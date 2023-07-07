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
        console.log(allPermission, "permission");
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
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#757575" viewBox="0 0 256 256"><path d="M239.73,208H224V96a16,16,0,0,0-16-16H164a4,4,0,0,0-4,4V208H144V32.41a16.43,16.43,0,0,0-6.16-13,16,16,0,0,0-18.72-.69L39.12,72A16,16,0,0,0,32,85.34V208H16.27A8.18,8.18,0,0,0,8,215.47,8,8,0,0,0,16,224H240a8,8,0,0,0,8-8.53A8.18,8.18,0,0,0,239.73,208ZM76,184a8,8,0,0,1-8.53,8A8.18,8.18,0,0,1,60,183.72V168.27A8.19,8.19,0,0,1,67.47,160,8,8,0,0,1,76,168Zm0-56a8,8,0,0,1-8.53,8A8.19,8.19,0,0,1,60,127.72V112.27A8.19,8.19,0,0,1,67.47,104,8,8,0,0,1,76,112Zm40,56a8,8,0,0,1-8.53,8,8.18,8.18,0,0,1-7.47-8.26V168.27a8.19,8.19,0,0,1,7.47-8.26,8,8,0,0,1,8.53,8Zm0-56a8,8,0,0,1-8.53,8,8.19,8.19,0,0,1-7.47-8.26V112.27a8.19,8.19,0,0,1,7.47-8.26,8,8,0,0,1,8.53,8Z"></path></svg>
              </ListItemIcon>
              <ListItemText primary="Companies"  />
            </ListItemButton>}
        
            {companyIndex && <ListItemButton component={Link} to="/vessel" >
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="Vessel"  />
            </ListItemButton>}
            {companyIndex && <ListItemButton component={Link} to="/auditcategories/list" >
              <ListItemIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#757575" viewBox="0 0 256 256"><path d="M160,112a24,24,0,1,1-24-24A24,24,0,0,1,160,112Zm64-72V216a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V192H32a8,8,0,0,1,0-16H48V136H32a8,8,0,0,1,0-16H48V80H32a8,8,0,0,1,0-16H48V40A16,16,0,0,1,64,24H208A16,16,0,0,1,224,40ZM190.4,163.2A67.88,67.88,0,0,0,163,141.51a40,40,0,1,0-53.94,0A67.88,67.88,0,0,0,81.6,163.2a8,8,0,1,0,12.8,9.6,52,52,0,0,1,83.2,0,8,8,0,1,0,12.8-9.6Z"></path></svg>              </ListItemIcon>
              <ListItemText primary="Audits & Inspections"  />
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
            {/* {indexCountries && <ListItemButton component={Link} to="/countries">
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
            </ListItemButton>} */}
            </React.Fragment>
          </List>
        </Drawer>
    </>;
  };
export default Navigation;


