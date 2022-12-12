import React from "react";
import { createRoot } from "react-dom/client";
//import { Provider } from "react-redux";
//import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
//import Login from "./components/login/Login"

const container = document.getElementById("root")!;
const root = createRoot(container);


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/*<Provider store={store}>
      <Dashboard />
      </Provider>*/}
   </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
