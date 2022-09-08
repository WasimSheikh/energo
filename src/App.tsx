import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={ <Login />} />
          <Route path="Dashboard" element={<Dashboard />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
