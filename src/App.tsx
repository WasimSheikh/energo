import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Compaines from './components/companies/Listing';
import Users from './components/users/Listing';
import './App.css';
import AddCompany from './components/companies/Add';
import AddUser from './components/users/Add';

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
      </Routes>
    </BrowserRouter>
  );
}
export default App;
