import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import theme from "./Components/Template";
import configureStore from './config/configStore';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
        <ToastContainer
         autoClose={15000}
        />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
