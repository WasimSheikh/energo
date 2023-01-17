
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Compaines from './components/companies/Listing';
import Users from './components/users/Listing';
import AddCompany from './components/companies/Add';
import ViewCompany from './components/companies/View';
import EditCompany from './components/companies/Edit';
import DocumentCompany from './components/companies/Documents';
import AddUser from './components/users/Add';
import EditUser from './components/users/Edit';
import ViewUser from './components/users/View';
import Documents from './components/documents/Listing';
import Share from './components/companies/Share';
import Notifications from './components/notifications/Listing';
import DocumentView from './components/companies/DocumentView';
import Roles from './components/roles/Listing';
import AddRole from './components/roles/Add';
import EditRole from './components/roles/Edit';
import ViewRole from './components/roles/View';
import Permissions from './components/permissions/Listing';
import AddPermission from './components/permissions/Add';
import EditPermission from './components/permissions/Edit';
import ViewPermission from './components/permissions/View';
import ProfileEdit from "./components/profile/Edit";
import Navgiate from "./components/common/Header";
import React, { useEffect } from 'react';
import ShareAdd from './components/companies/DocumentView';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContriesList from './components/countries/Listing';
import CountiesAdd from './components/countries/Add';
import CountiesEdit from './components/countries/Edit';
import CountriesView from './components/countries/View';
import DocumentList from './components/companies/Documents';
import CityList from './components/cities/Listing';
import CityAdd from './components/cities/Add';
import EditCity from './components/cities/Edit';
import StateAdd from './components/state/StateAdd';
import StateEdit from './components/state/StateEdit';
import StatesList from './components/state/StateListing';
import {useIdleTimer} from 'react-idle-timer';

function App() {
  const navigate = useNavigate();
  const [login, setIsLogin] = React.useState(false);
  const [onload,setOnload] = React.useState(false);
  const [documenets,setDocuments] = React.useState([]);

  const onIdle = ()=>{
console.log("object");
  }

  function IsLoggedIn(){
    let access_token = localStorage.getItem("access_token");
    return (access_token != '' && access_token != null ) ? true : false;
  }

  function shareDataF(data:any){
    setDocuments(data)
    console.log("app.tsx",documenets)
  }

  useEffect(() => {
    var token =  localStorage.getItem('access_token')
     if(onload==false){
        setIsLogin(IsLoggedIn());
        setOnload(true);
        if(token ==null){
         navigate("/");
        }
     } 
  }); 
  const idleTimer = useIdleTimer({ onIdle,    timeout: 5 * 1000, })
  return (
     <>
      <Routes>
          <Route index element={ <Login />} />
          {login== true &&
          <>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="companies" element={<Compaines />} />
          <Route path="companies/add" element={<AddCompany />} />
          <Route path="companies/view/:companyId" element={<ViewCompany />} />
          <Route path="companies/edit/:companyId" element={<EditCompany />} />
          <Route path="companies/document/:companyId" element={<DocumentList documents = {shareDataF}/>} />
          <Route path="companies/document/share/:companyId" element={<Share shareData={documenets} />} />
          <Route path="companies/document/view/:documentId/:companyId" element={<ShareAdd  />} />
          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/view/:userId" element={<ViewUser />} />
          <Route path="users/edit/:userId" element={<EditUser />} />
          <Route path="roles" element={<Roles />} />
          <Route path="roles/add" element={<AddRole />} />
          <Route path="roles/edit/:roleId" element={<EditRole />} />
          <Route path="roles/view/:roleId" element={<ViewRole />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="permissions/add" element={<AddPermission />} />
          <Route path="permissions/edit/:permissionId" element={<EditPermission />} />
          <Route path="permissions/view/:permissionId" element={<ViewPermission />} />
          <Route path="countries" element={<ContriesList />} />
          <Route path="countries/add" element={<CountiesAdd/>} />
          <Route path="countries/edit/:countriesId" element={<CountiesEdit />} />
          <Route path="countries/view/:countriesId" element={<CountriesView/>} />
          {/* <Route path="documents" element={<Documents />} /> */}
          {/* <Route path="documents/share" element={<Share />} /> */}
          <Route path="notifications" element={<Notifications />} /> 
          <Route path="Profile" element={<ProfileEdit />} /> 
          <Route path="cities" element={<CityList />} /> 
          <Route path="cities/add" element={<CityAdd/>} />
          <Route path="cities/edit/:cityId" element={<EditCity />} />
          <Route path="states" element={<StatesList />} /> 
          <Route path="states/add" element={<StateAdd/>} />
          <Route path="states/edit/:stateId" element={<StateEdit />} />
          </>
        }
        
      </Routes>
      <ToastContainer/>
      </>
  );
}
export default App;
