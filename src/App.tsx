import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Compaines from './components/companies/Listing';
import Users from './components/users/Listing';
import AddCompany from './components/companies/Add';
import AddUser from './components/users/Add';
import Documents from './components/documents/Listing';
import Share from './components/documents/Share';
import Notifications from './components/notifications/Listing';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={ <Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="companies" element={<Compaines />} />
          <Route path="companies/add" element={<AddCompany />} />
          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="documents" element={<Documents />} />
          <Route path="documents/share" element={<Share />} />
          <Route path="notifications" element={<Notifications />} />
          
      </Routes>
    </BrowserRouter>
  );
}
export default App;
