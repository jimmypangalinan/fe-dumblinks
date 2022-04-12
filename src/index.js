import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

// usecontext
import { UserContextModalProvider } from './context/Modal'
import { UserContextTokenProvider } from './context/useContext'

import './index.css';
import App from './App';




ReactDOM.render(
  <React.StrictMode>
    <UserContextModalProvider>
      <UserContextTokenProvider>
        <Router>
          <App />
        </Router>
      </UserContextTokenProvider>
    </UserContextModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

