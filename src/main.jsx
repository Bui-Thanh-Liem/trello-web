// import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './redux/store.js';

import theme from './theme.js';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <App />
      <ToastContainer position="bottom-left" theme="light" />
    </CssVarsProvider>
  </Provider>
  // </React.StrictMode>
);
